import test from 'node:test'
import assert from 'node:assert/strict'
import { boardReducer, createBoardState, isRelatedCell, Board, userColors, pickUserColor, isNumberComplete } from './boardState.js'

import { createSavedBoard, loadBoard, saveBoard, listBoards, openBoard, boardName, archiveBoard, deleteBoard, getBoard, discardFinishedBoard } from './boardStore.js'

const user = { username: 'Guest' }
const pen = { fontFamily: 'Libertinus Mono', fontWeight: 'normal' }

test('changing board color recolors only the player entries, rejects taken colors, and persists', () => {
  const other = { username: 'Other' }
  const board = new Board({ type: 'chaos', user, usersInvited: [other] })
  board.colors = [{ user, color: userColors[0] }, { user: other, color: userColors[1] }]
  board.cells[0] = { kind: 'number', number: 1, user, color: userColors[0], pen }
  board.cells[1] = { kind: 'number', number: 2, user: other, color: userColors[1], pen }
  board.cells[2] = { kind: 'number', number: 3, given: true, color: '#171614' }
  board.cells[3] = { kind: 'note', numbers: [{ number: 1, user, color: userColors[0], pen }, { number: 2, user: other, color: userColors[1], pen }] }
  const initial = createBoardState(board)
  assert.equal(boardReducer(initial, { type: 'change-color', user, color: userColors[1] }), initial)
  assert.equal(boardReducer(initial, { type: 'change-color', user, color: 'invalid' }), initial)
  const updated = boardReducer(initial, { type: 'change-color', user, color: userColors[2] })
  assert.equal(updated.board.colors[0].color, userColors[2])
  assert.equal(updated.board.cells[0].color, userColors[2])
  assert.equal(updated.board.cells[0].pen, pen)
  assert.equal(updated.board.cells[1], board.cells[1])
  assert.equal(updated.board.cells[2], board.cells[2])
  assert.equal(updated.board.cells[3].numbers[0].color, userColors[2])
  assert.equal(updated.board.cells[3].numbers[1].color, userColors[1])
  assert.equal(board.cells[0].color, userColors[0])
  const values = new Map()
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  saveBoard(updated.board, storage)
  assert.equal(getBoard(board.id, user, storage).cells[0].color, userColors[2])
  for (const terminal of [{ archived: true }, { completedAt: Date.now() }, { failedAt: Date.now() }]) {
    const state = createBoardState({ ...board, ...terminal })
    assert.equal(boardReducer(state, { type: 'change-color', user, color: userColors[2] }), state)
  }
})

test('a new board has 81 empty cells and no selection or highlights', () => {
  const state = createBoardState(new Board({ type: 'chaos' }))
  assert.equal(state.board.cells.length, 81)
  assert.ok(state.board.cells.every((cell) => cell === null))
  assert.equal(state.selected, null)
  assert.ok(state.board.cells.every((_, index) => !isRelatedCell(index, state.selected)))
})

test('clicking a tile selects it, clicking it again deselects, and another tile changes selection', () => {
  const selected = boardReducer(createBoardState(new Board({ type: 'chaos' })), { type: 'select', index: 40 })
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
  const state = boardReducer(createBoardState(new Board({ type: 'chaos' })), { type: 'select', index: 40 })
  const next = boardReducer(state, { type: 'enter', number: 7, pen, user })
  assert.deepEqual(next.board.cells[40], { kind: 'number', number: 7, pen, user, color: next.board.colors[0].color })
  assert.equal(next.selected, 40)
  assert.equal(next.board.cells.filter(Boolean).length, 1)
  assert.equal(state.board.cells[40], null)
})

test('number button entry fills the cell and keeps it selected', () => {
  const state = boardReducer(createBoardState(new Board({ type: 'chaos' })), { type: 'select', index: 0 })
  const next = boardReducer(state, { type: 'enter', number: 9, pen, user })
  assert.equal(next.board.cells[0].number, 9)
  assert.equal(next.selected, 0)
})

test('entry does not overwrite an occupied tile or change its original font', () => {
  let state = boardReducer(createBoardState(new Board({ type: 'chaos' })), { type: 'select', index: 0 })
  state = boardReducer(state, { type: 'enter', number: 3, pen, user })
  const next = boardReducer(state, { type: 'enter', number: 5, user, pen: { fontFamily: 'Victor Mono' } })
  assert.deepEqual(next.board.cells[0], { kind: 'number', number: 3, pen, user, color: next.board.colors[0].color })
})

test('unselected entry and numbers outside 1–9 do not change the board', () => {
  const initial = createBoardState(new Board({ type: 'chaos' }))
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
  let state = boardReducer(createBoardState(new Board({ type: 'chaos' })), { type: 'select', index: 0 })
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
  let state = boardReducer(createBoardState(new Board({ type: 'chaos' })), { type: 'select', index: 0 })
  state = boardReducer(state, { type: 'toggle-notes' })
  state = boardReducer(state, { type: 'enter', number: 4, user, pen })
  state = boardReducer(state, { type: 'enter', number: 4, user, pen })
  assert.equal(state.board.cells[0], null)
})


test('saved boards restore notes and numbers, settings and participants without resetting', () => {
  const values = new Map()
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const original = createSavedBoard({ user, type: 'chaos', difficulty: 'expert', usersInvited: [{ username: 'Friend' }] }, storage)
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
  let state = boardReducer(createBoardState(new Board({ size: 6, user, type: 'chaos' })), { type: 'select', index: 0 })
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


test('archive moves a finished board out of active listings and deletion removes its saved references', () => {
  const values = new Map()
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) }
  const board = createSavedBoard({ user, type: 'chaos' }, storage)
  assert.throws(() => archiveBoard(board.id, user, storage), /Finish/)
  saveBoard({ ...board, completedAt: Date.now() }, storage)
  assert.equal(listBoards(user, storage).length, 0)
  assert.ok(getBoard(board.id, user, storage))
  const archived = archiveBoard(board.id, user, storage)
  assert.equal(archived.archived, true)
  assert.equal(listBoards(user, storage).filter((entry) => !entry.archived).length, 0)
  assert.equal(listBoards(user, storage).filter((entry) => entry.archived).length, 1)
  assert.equal(archiveBoard(board.id, user, storage).id, board.id)
  deleteBoard(board.id, user, storage)
  assert.equal(getBoard(board.id, user, storage), null)
  assert.equal(listBoards(user, storage).length, 0)
  assert.equal(storage.getItem(`sugoku-active-board:${user.username}`), null)
})

test('leaving results discards finished boards but preserves active and archived boards', () => {
  const values = new Map()
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) }
  const active = createSavedBoard({ user, type: 'chaos' }, storage)
  discardFinishedBoard(active.id, user, storage)
  assert.ok(getBoard(active.id, user, storage))
  for (const finish of [{ completedAt: Date.now() }, { failedAt: Date.now(), livesUsed: 5 }]) {
    const board = createSavedBoard({ user, type: 'chaos' }, storage)
    saveBoard({ ...board, ...finish }, storage)
    assert.equal(listBoards(user, storage).some((entry) => entry.id === board.id), false)
    discardFinishedBoard(board.id, user, storage)
    assert.equal(getBoard(board.id, user, storage), null)
    discardFinishedBoard(board.id, user, storage)
  }
  saveBoard({ ...active, completedAt: Date.now() }, storage)
  archiveBoard(active.id, user, storage)
  discardFinishedBoard(active.id, user, storage)
  assert.equal(getBoard(active.id, user, storage).archived, true)
  assert.equal(listBoards(user, storage).length, 1)
})

test('archive capacity is reusable after deleting an archived board', () => {
  const values = new Map()
  const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) }
  const boards = Array.from({ length: 6 }, () => createSavedBoard({ user, type: 'chaos' }, storage))
  for (const board of boards) saveBoard({ ...board, completedAt: Date.now() }, storage)
  for (const board of boards.slice(0, 5)) archiveBoard(board.id, user, storage)
  assert.throws(() => archiveBoard(boards[5].id, user, storage), /full/)
  deleteBoard(boards[0].id, user, storage)
  assert.equal(archiveBoard(boards[5].id, user, storage).archived, true)
  assert.equal(listBoards(user, storage).filter((entry) => entry.archived).length, 5)
})


test('archived boards allow selection but reject all editing actions', () => {
  const board = new Board({ type: 'chaos', user })
  board.archived = true
  let state = createBoardState(board)
  state = boardReducer(state, { type: 'select', index: 0 })
  assert.equal(state.selected, 0)
  for (const action of [{ type: 'enter', number: 1, user, pen }, { type: 'erase' }, { type: 'toggle-notes' }]) {
    assert.equal(boardReducer(state, action), state)
  }
  assert.equal(boardReducer(state, { type: 'deselect' }).selected, null)
})


test('completed digits count givens and player entries, ignore notes, block entry, and return after erasing', () => {
  const board = new Board({ size: 6, type: 'chaos', user })
  board.cells[0] = { kind: 'number', number: 2, given: true }
  for (let index = 1; index < 6; index++) board.cells[index] = { kind: 'number', number: 2, user }
  board.cells[6] = { kind: 'note', numbers: [{ number: 3, user }] }
  assert.equal(isNumberComplete(board, 2), true)
  assert.equal(isNumberComplete(board, 3), false)
  let state = boardReducer(createBoardState(board), { type: 'select', index: 7 })
  assert.equal(boardReducer(state, { type: 'enter', number: 2, user, pen }), state)
  state = boardReducer(state, { type: 'toggle-notes' })
  assert.equal(boardReducer(state, { type: 'enter', number: 2, user, pen }), state)
  state = boardReducer(state, { type: 'select', index: 1 })
  state = boardReducer(state, { type: 'erase' })
  assert.equal(isNumberComplete(state.board, 2), false)
})
