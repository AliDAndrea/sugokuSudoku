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
    await writeFile(file, 'export default { username: "Player", totalXp: 12, level: 1, puzzlesCompleted: 3, dailyStreak: 4, fastestTime: 90 }')
    let middleware
    profilePersistence(file).configureServer({ middlewares: { use: (_, handler) => { middleware = handler } } })
    const request = async (updates, expectedOk = true) => {
      const input = Readable.from([Buffer.from(JSON.stringify(updates))])
      input.url = '/profile'
      input.method = 'POST'
      input.headers = { 'content-type': 'application/json' }
      let body
      const response = { setHeader() {}, end(value) { body = JSON.parse(value) } }
      await middleware(input, response, () => {})
      if (!expectedOk) {
        assert.equal(body.error, 'Invalid completion time.')
        return
      }
      assert.equal(body.ok, true)
      return body.profile
    }
    const results = await Promise.all([request({ completedBoardId: 'board-one' }), request({ completedBoardId: 'board-one' })])
    assert.ok(results.every((profile) => profile.totalXp === 21 && profile.level === 7))
    assert.ok(results.every((profile) => profile.puzzlesCompleted === 4))
    assert.ok(results.every((profile) => profile.dailyStreak === 4 && profile.fastestTime === 90))
    assert.equal((await request({})).puzzlesCompleted, 4)
    assert.equal((await request({})).totalXp, 21)
    const faster = await request({ completedBoardId: 'board-two', completionSeconds: 60 })
    assert.equal(faster.totalXp, 365)
    assert.equal(faster.level, 9)
    assert.equal(faster.fastestTime, 60)
    assert.equal((await request({ completedBoardId: 'board-two', completionSeconds: 10 })).fastestTime, 60)
    const source = await readFile(file, 'utf8')
    const saved = JSON.parse(source.slice(source.indexOf('{'), source.lastIndexOf('}') + 1))
    assert.equal(saved.totalXp, 365)
    assert.equal(saved.accounts[0].totalXp, 365)
    assert.equal(saved.puzzlesCompleted, 5)
    assert.equal(saved.accounts[0].puzzlesCompleted, 5)
    assert.deepEqual(saved.rewardedBoards, ['board-one', 'board-two'])
    assert.equal(saved.level, 9)
    assert.equal(saved.accounts[0].level, 9)
    assert.equal(saved.fastestTime, 60)
    assert.equal(saved.accounts[0].fastestTime, 60)
    assert.equal((await request({ completedBoardId: 'board-three', completionSeconds: 120 })).fastestTime, 60)
    await request({ completionSeconds: 1 }, false)
    assert.equal((await request({})).fastestTime, 60)
    await writeFile(file, 'export default { username: "Player", fastestTime: 0 }')
    assert.equal((await request({ completedBoardId: 'first-completion', completionSeconds: 75 })).fastestTime, 75)
  } finally { await rm(directory, { recursive: true, force: true }) }
})
