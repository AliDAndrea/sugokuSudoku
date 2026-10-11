import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import { runInNewContext } from 'node:vm'

const source = stripTypeScriptTypes(readFileSync(new URL('./index.ts', import.meta.url), 'utf8')
  .replace(/^import .*\n/, ''))

function setup({ duplicate = false, known = true, validPassword = true } = {}) {
  let handler
  let created
  const client = {
    from: () => ({ select: () => ({ ilike: () => ({ maybeSingle: async () => ({ data: known ? { id: 'player' } : null }) }) }) }),
    auth: {
      admin: {
        createUser: async (input) => {
          created = input
          return duplicate ? { error: {} } : { data: { user: { id: 'player' } } }
        },
        getUserById: async () => ({ data: { user: { email: 'internal@accounts.sugoku.invalid' } } }),
      },
      signInWithPassword: async () => validPassword
        ? { data: { session: { access_token: 'access', refresh_token: 'refresh' } } }
        : { data: {}, error: {} },
    },
  }
  runInNewContext(source, {
    createClient: () => client, Response, crypto,
    Deno: { env: { get: () => 'configured' }, serve: (callback) => { handler = callback } },
  })
  return {
    submit: (body) => handler(new Request('https://example.test', { method: 'POST', body: JSON.stringify(body) })),
    created: () => created,
  }
}

test('signup needs no email and returns a session without email verification', async () => {
  const app = setup()
  const response = await app.submit({ action: 'signup', username: ' Player ', password: 'password123' })
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { session: { access_token: 'access', refresh_token: 'refresh' } })
  assert.equal(app.created().email_confirm, true)
  assert.equal(app.created().user_metadata.username, 'Player')
  assert.match(app.created().email, /@accounts\.sugoku\.invalid$/)
})

test('failed account creation does not return session tokens', async () => {
  const response = await setup({ duplicate: true }).submit({ action: 'signup', username: 'Player', password: 'password123' })
  assert.equal(response.status, 400)
  assert.equal((await response.json()).session, undefined)
})

test('signin checks username and password without asking for email', async () => {
  const response = await setup().submit({ action: 'signin', username: 'Player', password: 'password123' })
  assert.equal(response.status, 200)
})

test('unknown username and incorrect password have the same error', async () => {
  for (const options of [{ known: false }, { validPassword: false }]) {
    const response = await setup(options).submit({ username: 'Player', password: 'wrong' })
    assert.equal(response.status, 401)
    assert.deepEqual(await response.json(), { error: 'Invalid username or password.' })
  }
})
