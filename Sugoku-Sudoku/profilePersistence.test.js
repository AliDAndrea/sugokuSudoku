import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import test from 'node:test'
import profilePersistence from './profilePersistence.js'

test('local level, Sudo, and hints persist on the active account', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'sugoku-profile-'))
  t.after(() => rm(directory, { recursive: true, force: true }))

  const userFile = join(directory, 'user.mjs')
  const accounts = [
    { username: 'Alice', password: 'alice-password', level: 2, sudo: 40, hints: 3 },
    { username: 'Bob', password: 'bob-password', level: 4, sudo: 80, hints: 6 },
  ]
  await writeFile(userFile, `const user = ${JSON.stringify({ ...accounts[0], accounts })}\nexport default user\n`)

  let middleware
  profilePersistence(pathToFileURL(userFile)).configureServer({
    middlewares: { use: (_path, handler) => { middleware = handler } },
  })

  async function request(method, url, body) {
    const response = {
      statusCode: 200,
      setHeader() {},
      end(content) { this.content = content },
    }
    const chunks = body === undefined ? [] : [Buffer.from(JSON.stringify(body))]
    const req = {
      method,
      url,
      headers: { 'content-type': 'application/json' },
      async *[Symbol.asyncIterator]() { yield* chunks },
    }
    await middleware(req, response, () => assert.fail(`Unexpected middleware route: ${url}`))
    return { status: response.statusCode, ...JSON.parse(response.content) }
  }

  const signin = await request('POST', '/account', {
    action: 'signin',
    username: 'Bob',
    password: 'bob-password',
  })
  assert.equal(signin.ok, true)
  assert.equal(signin.profile.level, 4)
  assert.equal(signin.profile.sudo, 80)
  assert.equal(signin.profile.hints, 6)

  const save = await request('POST', '/profile', { level: 9, sudo: 321, hints: 12 })
  assert.equal(save.ok, true)

  const savedModule = await import(`${pathToFileURL(userFile).href}?updated=${Date.now()}`)
  const savedUser = savedModule.default
  const alice = savedUser.accounts.find(({ username }) => username === 'Alice')
  const bob = savedUser.accounts.find(({ username }) => username === 'Bob')
  assert.deepEqual(
    { level: alice.level, sudo: alice.sudo, hints: alice.hints },
    { level: 2, sudo: 40, hints: 3 },
  )
  assert.deepEqual(
    { level: bob.level, sudo: bob.sudo, hints: bob.hints },
    { level: 9, sudo: 321, hints: 12 },
  )
  assert.deepEqual(
    { level: savedUser.level, sudo: savedUser.sudo, hints: savedUser.hints },
    { level: 9, sudo: 321, hints: 12 },
  )

  const invalidLevel = await request('POST', '/profile', { level: 0 })
  assert.equal(invalidLevel.status, 400)
})
