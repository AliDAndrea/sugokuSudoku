import test from 'node:test'
import assert from 'node:assert/strict'
import { logicalHintTiles } from './boardHints.js'
import { boardReducer, createBoardState, hintTarget } from './boardState.js'

const solution = Array.from({ length: 36 }, (_, i) => (Math.floor(i / 6) * 3 + Math.floor(Math.floor(i / 6) / 2) + i % 6) % 6 + 1)
const puzzle = (empty) => ({ size: 6, type: 'classic', cells: solution.map((number, i) => empty.includes(i) ? null : { kind: 'number', number }), hintsUsed: 0, livesUsed: 0 })

test('random hints ignore selection and do not use the solution', () => {
  const board = puzzle([0, 8, 19])
  const state = { ...createBoardState(board), selected: 0 }
  assert.deepEqual(logicalHintTiles(board).sort((a, b) => a - b), [0, 8, 19])
  const targets = logicalHintTiles(board)
  assert.equal(hintTarget(state, () => 0), targets[0])
  assert.equal(hintTarget(state, length => length - 1), targets.at(-1))
  assert.deepEqual(logicalHintTiles({ ...board, solution: Array(36).fill(9) }), targets)
})

test('hints only highlight and preserve entries, selection, notes, and completion', () => {
  const board = puzzle([8])
  board.cells[8] = { kind: 'note', numbers: [{ number: 6 }] }
  const state = { ...createBoardState(board), selected: 0, noteMode: true }
  const next = boardReducer(state, { type: 'hint', index: 8, user: { username: 'Tester' } })
  assert.equal(next.board.activeHints[0].index, 8)
  assert.equal(next.selected, 0)
  assert.equal(next.noteMode, true)
  assert.equal(next.board.cells, board.cells)
  assert.equal(next.board.hintsUsed, 1)
  assert.equal(next.board.completedAt, undefined)
  assert.deepEqual(next.celebrations, [])
})

test('no deduction, contradictory entries, and finished boards cannot consume hints', () => {
  for (const board of [puzzle(Array.from({ length: 36 }, (_, i) => i)), { ...puzzle([0]), archived: true }, { ...puzzle([0]), completedAt: 1 }, { ...puzzle([0]), failedAt: 1 }, { ...puzzle([0]), livesUsed: 5 }]) {
    assert.deepEqual(logicalHintTiles(board), [])
    const state = createBoardState(board)
    assert.equal(boardReducer(state, { type: 'hint', index: 0 }), state)
  }
  const invalid = puzzle([0])
  invalid.cells[1] = invalid.cells[2]
  assert.deepEqual(logicalHintTiles(invalid), [])
})

test('killer cage sums can identify a tile on an otherwise empty board', () => {
  const board = puzzle(Array.from({ length: 36 }, (_, i) => i))
  board.type = 'killer'
  board.cages = [{ cells: [7], sum: 4 }]
  assert.ok(logicalHintTiles(board).includes(7))
})

test('chaos regions determine candidates instead of classic boxes', () => {
  const board = puzzle([0])
  board.regions = Array.from({ length: 36 }, (_, i) => Math.floor(i / 6))
  assert.ok(logicalHintTiles(board).includes(0))
})

const player = { username: 'One' }
const other = { username: 'Two' }
const pen = { fontFamily: 'serif', fontWeight: 400 }

test('one saved hint per player survives reopening; another hint fills only their tile', async () => {
  const { saveBoard, getBoard } = await import('./boardStore.js')
  const board = { ...puzzle([0, 8, 19]), solution, id: 'hints-test', createdBy: player, usersInvited: [other], colors: [{ user: player, color: '#174FC4' }, { user: other, color: '#FF294D' }] }
  let state = createBoardState(board)
  state = boardReducer(state, { type: 'hint', index: 0, user: player })
  state = boardReducer(state, { type: 'hint', index: 8, user: other })
  assert.deepEqual(state.board.activeHints.map(h => [h.username, h.index]), [['One', 0], ['Two', 8]])
  assert.equal(state.board.activeHints[1].color, '#FF294D')
  assert.equal(hintTarget(state, () => 0, player), 0)
  assert.equal(hintTarget(state, () => 0, { username: 'Three' }), 19)
  const data = new Map()
  const storage = { getItem: key => data.get(key) || null, setItem: (key, value) => data.set(key, value) }
  saveBoard(state.board, storage)
  state = createBoardState(getBoard(board.id, player, storage))
  assert.equal(state.board.activeHints.length, 2)
  state = boardReducer(state, { type: 'hint', index: 0, user: player, pen })
  assert.equal(state.board.cells[0].number, solution[0])
  assert.equal(state.board.cells[0].user.username, 'One')
  assert.deepEqual(state.board.activeHints.map(h => h.username), ['Two'])
  assert.equal(state.board.hintsUsed, 3)
  state = boardReducer({ ...state, selected: 8 }, { type: 'enter', number: solution[8], user: player, pen })
  assert.deepEqual(state.board.activeHints, [])
})

test('a manually filled hint does not reappear after erasing the answer', () => {
  let state = createBoardState({ ...puzzle([0, 8]), solution, colors: [{ user: player, color: '#174FC4' }] })
  state = boardReducer(state, { type: 'hint', index: 0, user: player })
  state = boardReducer({ ...state, selected: 0 }, { type: 'enter', number: solution[0], user: player, pen })
  state = boardReducer(state, { type: 'erase' })
  assert.deepEqual(state.board.activeHints, [])
})

test('the screenshot tile r6c3 is a hidden single for 4 in column 3', () => {
  const numbers = [3,0,0,0,4,0, 0,0,5,0,0,0, 0,5,0,0,0,4, 0,0,3,0,0,1, 0,2,0,4,3,6, 0,3,0,0,1,0]
  const board = { size: 6, livesUsed: 0, cells: numbers.map(number => number ? { kind: 'number', number } : null) }
  assert.equal(logicalHintTiles(board).includes(32), true)
  assert.ok(logicalHintTiles(board).includes(26))
})

test('when no highlight is possible, fallback fills one tile and counts one hint', async () => {
  const { hintFillTarget } = await import('./boardState.js')
  const board = { ...puzzle(Array.from({ length: 36 }, (_, i) => i)), solution, colors: [{ user: player, color: '#174FC4' }] }
  const state = { ...createBoardState(board), selected: 12, noteMode: true }
  const index = hintFillTarget(board, length => length - 1)
  assert.equal(index, 35)
  const action = { type: 'hint', index, user: player, pen, fillFallback: true, provenTargets: [], analyzedCells: board.cells }
  const next = boardReducer(state, action)
  assert.equal(next.board.cells[35].number, solution[35])
  assert.equal(next.board.cells.filter(Boolean).length, 1)
  assert.equal(next.board.hintsUsed, 1)
  assert.equal(next.board.livesUsed, 0)
  assert.equal(next.selected, 12)
  assert.equal(next.noteMode, true)
  assert.equal(hintFillTarget({ ...board, solution: null }), null)
  assert.equal(hintFillTarget({ ...board, completedAt: 1 }), null)
  assert.equal(boardReducer(state, { ...action, provenTargets: [index] }), state)
  assert.equal(boardReducer(state, { ...action, analyzedCells: [] }), state)
})

test('other players cannot highlight or fallback-fill an occupied hint tile', async () => {
  const { hintFillTarget } = await import('./boardState.js')
  const { advancedHintTiles } = await import('./advancedHints.js')
  const board = { ...puzzle([0, 8]), solution, colors: [{ user: player, color: '#174FC4' }] }
  const state = boardReducer(createBoardState(board), { type: 'hint', index: 0, user: player })
  assert.equal(hintTarget(state, () => 0, other), 8)
  assert.equal(hintFillTarget(state.board, () => 0), 8)
  assert.deepEqual(advancedHintTiles(state.board), [8])
  const request = { type: 'hint', index: 0, user: other, pen, analyzedCells: state.board.cells }
  assert.equal(boardReducer(state, request), state)
  assert.equal(boardReducer(state, { ...request, provenTargets: [0] }), state)
  assert.equal(boardReducer(state, { ...request, fillFallback: true, provenTargets: [] }), state)
  const filled = boardReducer(state, { ...request, user: player })
  assert.equal(filled.board.cells[0].number, solution[0])
  assert.equal(filled.board.hintsUsed, 2)
})
