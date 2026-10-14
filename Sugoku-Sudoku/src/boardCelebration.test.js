import test from 'node:test'
import assert from 'node:assert/strict'
import { completionFlashes } from './boardCelebration.js'
import { boardReducer, createBoardState } from './boardState.js'
import { EmptyBoard as Board } from './boardTestFixtures.js'

for (const size of [6, 9]) {
  test(`${size}x${size} flashes completed rows, columns and boxes with distance offsets`, () => {
    const board = new Board({ size, type: 'killer' })
    assert.deepEqual(completionFlashes(board, board.cells, 0), [])
    for (let index = 0; index < size; index++) board.cells[index] = { kind: 'number', number: index + 1 }
    assert.deepEqual(completionFlashes(board, board.cells, 0), Array.from({ length: size }, (_, index) => ({ index, delay: index * 50 })))
    const boxRows = size === 6 ? 2 : 3
    for (let index = 0; index < size * size; index++) {
      if (index % size === 0 || (Math.floor(index / size) < boxRows && index % size < 3)) board.cells[index] = { kind: 'number', number: 1 }
    }
    const flashes = completionFlashes(board, board.cells, 0)
    assert.equal(new Set(flashes.map((flash) => flash.index)).size, flashes.length)
    assert.ok(flashes.some((flash) => flash.index === size + 1))
    assert.equal(flashes.find((flash) => flash.index === 1).delay, flashes.find((flash) => flash.index === size).delay)
    assert.equal(flashes.find((flash) => flash.index === size + 1).delay, 50)
    const all = completionFlashes(board, board.cells, 0, true)
    assert.equal(all.length, size * size)
    assert.equal(all.find((flash) => flash.index === 0).delay, 0)
    assert.equal(all.find((flash) => flash.index === size + 1).delay, 50)
    assert.equal(all.find((flash) => flash.index === 2 * size + 2).delay, 100)
    assert.ok(all.find((flash) => flash.index === size * size - 1).delay > all.find((flash) => flash.index === size + 1).delay)
  })
}

test('only number placement triggers a celebration in the completing player color', () => {
  const user = { username: 'Player' }
  const board = new Board({ size: 6, type: 'killer', user })
  for (let index = 1; index < 6; index++) board.cells[index] = { kind: 'number', number: index + 1 }
  const initial = { ...createBoardState(board), selected: 0 }
  assert.deepEqual(boardReducer({ ...initial, noteMode: true }, { type: 'enter', number: 1, user }).celebrations, [])
  const next = boardReducer(initial, { type: 'enter', number: 1, user })
  assert.equal(next.celebrations[0].color, board.colors[0].color)
  assert.equal(next.celebrations[0].flashes.length, 6)
  assert.deepEqual(boardReducer(next, { type: 'finish-celebration', id: next.celebrations[0].id }).celebrations, [])
  assert.equal(boardReducer(next, { type: 'enter', number: 2, user }), next)
})

test('a correct guess flashes only its tile, while incorrect guesses and notes do not flash', () => {
  const user = { username: 'Player' }
  const board = new Board({ size: 6, type: 'killer', user })
  board.solution = Array(36).fill(1)
  const initial = { ...createBoardState(board), selected: 7 }
  const correct = boardReducer(initial, { type: 'enter', number: 1, user })
  assert.deepEqual(correct.celebrations[0].flashes, [{ index: 7, delay: 0 }])
  assert.equal(correct.celebrations[0].color, board.colors[0].color)
  assert.deepEqual(boardReducer(initial, { type: 'enter', number: 2, user }).celebrations, [])
  assert.deepEqual(boardReducer({ ...initial, noteMode: true }, { type: 'enter', number: 1, user }).celebrations, [])
})
