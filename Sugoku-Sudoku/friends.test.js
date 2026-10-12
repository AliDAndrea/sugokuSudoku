import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { Buffer } from 'node:buffer'
import profilePersistence from './profilePersistence.js'

test('friends search, requests, acceptance, removal and minimum signup length persist across accounts', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'sugoku-friends-'))
  try {
    const file = join(directory, 'user.js')
    const profileImage = 'data:image/png;base64,aGVsbG8='
    await writeFile(file, `export default ${JSON.stringify({ username: 'Alice', password: 'password123', profileImage })}`)
    let middleware
    profilePersistence(file).configureServer({ middlewares: { use: (_, handler) => { middleware = handler } } })
    const request = async (url, updates) => {
      const input = Readable.from(updates ? [Buffer.from(JSON.stringify(updates))] : [])
      input.url = url
      input.method = updates ? 'POST' : 'GET'
      input.headers = { 'content-type': 'application/json' }
      let result
      await middleware(input, { setHeader() {}, end(body) { result = JSON.parse(body) } }, () => assert.fail('Unhandled route'))
      return result
    }
    assert.match((await request('/account', { action: 'signup', username: ' ab ', password: 'password123' })).error, /at least 3/)
    assert.match((await request('/account', { action: 'signup', username: 'x'.repeat(36), password: 'password123' })).error, /35 characters/)
    assert.equal((await request('/account', { action: 'signup', username: 'x'.repeat(35), password: 'password123' })).ok, true)
    assert.equal((await request('/account', { action: 'signup', username: 'Bobby', password: 'password123' })).ok, true)
    await request('/account', { action: 'signin', username: 'Alice', password: 'password123' })
    assert.deepEqual((await request('/friends?search=bo')).searchResults, [])
    assert.deepEqual((await request('/friends?search=BOB')).searchResults, [{ id: 'bobby', name: 'Bobby', profileImage: null }])
    assert.deepEqual((await request('/friends?search=ali')).searchResults, [])
    assert.equal((await request('/friends', { action: 'accept', id: 'bobby' })).ok, undefined)
    await request('/friends', { action: 'request', id: 'bobby' })
    await request('/friends', { action: 'request', id: 'bobby' })
    assert.deepEqual((await request('/friends?search=bob')).searchResults, [])
    await request('/account', { action: 'signin', username: 'Bobby', password: 'password123' })
    assert.deepEqual((await request('/friends')).friendRequests, [{ id: 'alice', name: 'Alice', profileImage }])
    assert.deepEqual((await request('/friends?search=ali')).searchResults, [{ id: 'alice', name: 'Alice', profileImage }])
    assert.equal((await request('/friends', { action: 'accept', id: 'alice' })).ok, true)
    assert.deepEqual((await request('/friends')).friendRequests, [])
    assert.deepEqual((await request('/friends')).friends, [{ id: 'alice', name: 'Alice', profileImage }])
    await request('/profile', { username: 'Robert' })
    await request('/account', { action: 'signin', username: 'Alice', password: 'password123' })
    assert.deepEqual((await request('/friends')).friends, [{ id: 'robert', name: 'Robert', profileImage: null }])
    await request('/friends', { action: 'remove', id: 'robert' })
    assert.deepEqual((await request('/friends')).friends, [])
    await request('/account', { action: 'signin', username: 'Robert', password: 'password123' })
    assert.deepEqual((await request('/friends')).friends, [])
  } finally { await rm(directory, { recursive: true, force: true }) }
})
