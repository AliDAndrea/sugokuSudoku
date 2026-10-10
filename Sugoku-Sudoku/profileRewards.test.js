import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Buffer } from 'node:buffer'
import { Readable } from 'node:stream'
import profilePersistence from './profilePersistence.js'

test('completion rewards persist once per board, including simultaneous retries', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'sugoku-reward-'))
  try {
    const file = join(directory, 'user.js')
    await writeFile(file, 'export default { username: "Player", totalXp: 12, level: 1, puzzlesCompleted: 3 }')
    let middleware
    profilePersistence(file).configureServer({ middlewares: { use: (_, handler) => { middleware = handler } } })
    const request = async (updates) => {
      const input = Readable.from([Buffer.from(JSON.stringify(updates))])
      input.url = '/profile'
      input.method = 'POST'
      input.headers = { 'content-type': 'application/json' }
      let body
      const response = { setHeader() {}, end(value) { body = JSON.parse(value) } }
      await middleware(input, response, () => {})
      assert.equal(body.ok, true)
      return body.profile
    }
    const results = await Promise.all([request({ completedBoardId: 'board-one' }), request({ completedBoardId: 'board-one' })])
    assert.ok(results.every((profile) => profile.totalXp === 17))
    assert.ok(results.every((profile) => profile.puzzlesCompleted === 4))
    assert.equal((await request({})).puzzlesCompleted, 4)
    assert.equal((await request({})).totalXp, 17)
    assert.equal((await request({ completedBoardId: 'board-two' })).totalXp, 22)
    const source = await readFile(file, 'utf8')
    const saved = JSON.parse(source.slice(source.indexOf('{'), source.lastIndexOf('}') + 1))
    assert.equal(saved.totalXp, 22)
    assert.equal(saved.accounts[0].totalXp, 22)
    assert.equal(saved.puzzlesCompleted, 5)
    assert.equal(saved.accounts[0].puzzlesCompleted, 5)
    assert.deepEqual(saved.rewardedBoards, ['board-one', 'board-two'])
    assert.equal(saved.level, 1)
  } finally { await rm(directory, { recursive: true, force: true }) }
})
