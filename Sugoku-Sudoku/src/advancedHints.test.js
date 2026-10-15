import test from 'node:test'
import assert from 'node:assert/strict'
import { advancedHintTiles } from './advancedHints.js'
import { logicalHintTiles } from './boardHints.js'
import { boardReducer, createBoardState } from './boardState.js'

const fromString = text => ({ size: Math.sqrt(text.length), livesUsed: 0, hintsUsed: 0, cells: [...text].map(n => +n ? { kind: 'number', number: +n } : null) })

test('deep proofs find every empty tile on a hard unique puzzle with no singles', () => {
  const board = fromString('100007090030020008009600500005300900010080002600004000300000010041000007007000300')
  assert.deepEqual(logicalHintTiles(board), [])
  // Deliberately bogus saved answer: the proof must depend on visible clues only.
  board.solution = Array(81).fill(1)
  const targets = advancedHintTiles(board)
  assert.equal(targets.length, board.cells.filter(cell => !cell).length)
  const state = createBoardState(board)
  const action = { type: 'hint', index: targets[0], user: { username: 'Tester' }, provenTargets: targets, analyzedCells: board.cells }
  const next = boardReducer(state, action)
  assert.equal(next.board.activeHints[0].index, targets[0])
  assert.equal(next.board.cells, board.cells)
  assert.equal(next.board.hintsUsed, 1)
  const changed = { ...state, board: { ...board, cells: [...board.cells] } }
  assert.equal(boardReducer(changed, action), changed)
})

test('ambiguous empty boards have no forced values', () => {
  assert.deepEqual(advancedHintTiles(fromString('0'.repeat(36))), [])
})

test('proofs respect chaos regions, active hints, and finished boards', () => {
  const board = fromString('0'.repeat(36))
  board.regions = Array.from({ length: 36 }, (_, i) => Math.floor(i / 6))
  assert.deepEqual(advancedHintTiles(board), [])
  assert.deepEqual(advancedHintTiles({ ...board, archived: true }), [])
  board.cages = [{ cells: [0], sum: 1 }]
  board.activeHints = [{ index: 0, username: 'Other' }]
  assert.equal(advancedHintTiles(board).includes(0), false)
})

test('contradictory clues never produce a proof', () => {
  const board = fromString('0'.repeat(36))
  board.cells[0] = { kind: 'number', number: 1 }
  board.cells[1] = { kind: 'number', number: 1 }
  assert.deepEqual(advancedHintTiles(board), [])
})
