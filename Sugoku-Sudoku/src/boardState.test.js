import test from 'node:test'
import assert from 'node:assert/strict'
import { boardReducer, createBoardState, isRelatedCell, Board, userColors, pickUserColor } from './boardState.js'

import { createSavedBoard, loadBoard, saveBoard, listBoards, openBoard, boardName } from './boardStore.js'

const user = { username: 'Guest' }
const pen = { fontFamily: 'Libertinus Mono', fontWeight: 'normal' }

test('a new board has 81 empty cells and no selection or highlights', () => {
  const state = createBoardState()
  assert.equal(state.board.cells.length, 81)
  assert.ok(state.board.cells.every((cell) => cell === null))
  assert.equal(state.selected, null)
  assert.ok(state.board.cells.every((_, index) => !isRelatedCell(index, state.selected)))
})

test('clicking a tile selects it, clicking it again deselects, and another tile changes selection', () => {
  const selected = boardReducer(createBoardState(), { type: 'select', index: 40 })
  assert.equal(selected.selected, 40)
  assert.equal(boardReducer(selected, { type: 'select', index: 40 }).selected, null)
  assert.equal(boardReducer(selected, { type: 'select', index: 8 }).selected, 8)
  assert.equal(boardReducer(selected, { type: 'deselect' }).selected, null)
})

test('only the other sixteen cells in the selected row and column are highlighted', () => {
  const related = Array.from({ length: 81 }, (_, index) => index).filter((index) => isRelatedCell(index, 40))
  assert.equal(related.length, 16)
  assert.ok(related.every((index) => Math.floor(index / 9) === 4 || index % 9 === 4))
  assert.equal(isRelatedCell(40, 40), false)
  assert.equal(isRelatedCell(30, 40), false)
})

test('keyboard entry fills only the selected cell and retains selection and its pen font', () => {
  const state = boardReducer(createBoardState(), { type: 'select', index: 40 })
  const next = boardReducer(state, { type: 'enter', number: 7, pen, user })
  assert.deepEqual(next.board.cells[40], { kind: 'number', number: 7, pen, user, color: next.board.colors[0].color })
  assert.equal(next.selected, 40)
  assert.equal(next.board.cells.filter(Boolean).length, 1)
  assert.equal(state.board.cells[40], null)
})

test('number button entry fills the cell and keeps it selected', () => {
  const state = boardReducer(createBoardState(), { type: 'select', index: 0 })
  const next = boardReducer(state, { type: 'enter', number: 9, pen, user })
  assert.equal(next.board.cells[0].number, 9)
  assert.equal(next.selected, 0)
})

test('entry does not overwrite an occupied tile or change its original font', () => {
  let state = boardReducer(createBoardState(), { type: 'select', index: 0 })
  state = boardReducer(state, { type: 'enter', number: 3, pen, user })
  const next = boardReducer(state, { type: 'enter', number: 5, user, pen: { fontFamily: 'Victor Mono' } })
  assert.deepEqual(next.board.cells[0], { kind: 'number', number: 3, pen, user, color: next.board.colors[0].color })
})

test('unselected entry and numbers outside 1–9 do not change the board', () => {
  const initial = createBoardState()
  assert.equal(boardReducer(initial, { type: 'enter', number: 4, pen }), initial)
  const selected = boardReducer(initial, { type: 'select', index: 0 })
  for (const number of [0, 10, -1, 1.5, '3']) {
    assert.equal(boardReducer(selected, { type: 'enter', number, pen }), selected)
  }
})


test('creation preserves options, invited user objects, distinct colors, and shared counters', () => {
  const invited = { username: 'Friend' }
  const board = new Board({ size: '6x6', difficulty: 'hard', type: 'chaos', user, usersInvited: [invited] })
  assert.equal(board.size, 6)
  assert.equal(board.cells.length, 36)
  assert.equal(board.difficulty, 'hard')
  assert.equal(board.type, 'chaos')
  assert.deepEqual(board.usersInvited, [invited])
  assert.equal(board.hintsUsed, 0)
  assert.equal(board.livesUsed, 0)
  assert.notEqual(board.colors[0].color, board.colors[1].color)
})

test('notes toggle individually, retain author objects, and normal entry clears all notes', () => {
  let state = boardReducer(createBoardState(), { type: 'select', index: 0 })
  state = boardReducer(state, { type: 'toggle-notes' })
  for (const number of [1, 5, 9]) state = boardReducer(state, { type: 'enter', number, user, pen })
  assert.deepEqual(state.board.cells[0].numbers.map((note) => note.number), [1, 5, 9])
  assert.deepEqual(state.board.cells[0].numbers[0].user, user)
  state = boardReducer(state, { type: 'enter', number: 5, user, pen })
  assert.deepEqual(state.board.cells[0].numbers.map((note) => note.number), [1, 9])
  state = boardReducer(state, { type: 'toggle-notes' })
  state = boardReducer(state, { type: 'enter', number: 3, user, pen })
  assert.equal(state.board.cells[0].kind, 'number')
  assert.equal(state.board.cells[0].number, 3)
  assert.equal(state.board.cells[0].numbers, undefined)
  assert.equal(state.selected, 0)
  state = boardReducer(state, { type: 'toggle-notes' })
  assert.equal(boardReducer(state, { type: 'enter', number: 2, user, pen }), state)
})

test('removing the final note empties a tile', () => {
  let state = boardReducer(createBoardState(), { type: 'select', index: 0 })
  state = boardReducer(state, { type: 'toggle-notes' })
  state = boardReducer(state, { type: 'enter', number: 4, user, pen })
  state = boardReducer(state, { type: 'enter', number: 4, user, pen })
  assert.equal(state.board.cells[0], null)
})


test('saved boards restore notes and numbers, settings and participants without resetting', () => {
  const values = new Map()
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const original = createSavedBoard({ user, difficulty: 'expert', usersInvited: [{ username: 'Friend' }] }, storage)
  let state = boardReducer(createBoardState(original), { type: 'select', index: 4 })
  state = boardReducer(state, { type: 'enter', number: 8, user, pen })
  state = boardReducer(state, { type: 'select', index: 5 })
  state = boardReducer(state, { type: 'toggle-notes' })
  state = boardReducer(state, { type: 'enter', number: 2, user, pen })
  saveBoard(state.board, storage)
  const restored = loadBoard(user, storage)
  assert.ok(restored.lastOpenedAt >= original.createdAt)
  assert.deepEqual({ ...restored, lastOpenedAt: state.board.lastOpenedAt }, state.board)
  const second = createSavedBoard({ user, size: 6 }, storage)
  assert.notEqual(second.id, original.id)
  assert.equal(loadBoard(user, storage).id, second.id)
  assert.ok([...values.values()].some((value) => value.includes(original.id)))
})


test('reserve lists real boards by latest opened and opening selects the exact saved board', () => {
  const values = new Map()
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const first = createSavedBoard({ user, difficulty: 'hard', type: 'killer' }, storage)
  const second = createSavedBoard({ user, size: 6 }, storage)
  saveBoard({ ...first, lastOpenedAt: 100 }, storage)
  saveBoard({ ...second, lastOpenedAt: 200 }, storage)
  assert.deepEqual(listBoards(user, storage).map((board) => board.id), [second.id, first.id])
  assert.equal(boardName(first), 'Hard Killer 9x9')
  openBoard(first, user, storage)
  assert.equal(listBoards(user, storage)[0].id, first.id)
  assert.equal(loadBoard(user, storage).id, first.id)
  assert.equal(listBoards({ username: 'Stranger' }, storage).length, 0)
})


test('6x6 rejects digits 7-9 in both normal and note mode', () => {
  let state = boardReducer(createBoardState(new Board({ size: 6, user })), { type: 'select', index: 0 })
  for (const noteMode of [false, true]) {
    if (noteMode) state = boardReducer(state, { type: 'toggle-notes' })
    for (const number of [7, 8, 9]) assert.equal(boardReducer(state, { type: 'enter', number, user, pen }), state)
  }
  state = boardReducer(state, { type: 'enter', number: 6, user, pen })
  assert.equal(state.board.cells[0].numbers[0].number, 6)
})


test('color pool has exactly nine distinct colors and each participant gets a unique random choice', () => {
  assert.equal(userColors.length, 9)
  assert.equal(new Set(userColors).size, 9)
  assert.equal(pickUserColor([], () => 0), userColors[0])
  assert.equal(pickUserColor([], (length) => length - 1), userColors.at(-1))
  assert.equal(pickUserColor([{ color: userColors[0] }], () => 0), userColors[1])
  const board = new Board({ user, usersInvited: Array.from({ length: 8 }, (_, index) => ({ username: `Friend${index}` })) })
  assert.equal(new Set(board.colors.map((entry) => entry.color)).size, 9)
  assert.ok(board.colors.every((entry) => userColors.includes(entry.color)))
})
