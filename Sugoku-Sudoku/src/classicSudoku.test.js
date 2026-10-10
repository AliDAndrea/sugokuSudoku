import test from 'node:test'
import assert from 'node:assert/strict'
import { generateClassic, solveClassic } from './classicSudoku.js'
import { Board, boardReducer, createBoardState } from './boardState.js'
import { createSavedBoard, loadBoard, saveBoard } from './boardStore.js'

function seeded(seed) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 0x100000000 }
}

// Independent set-based solution counter to verify the bitmask generator.
function countIndependently(puzzle, size) {
  const values = [...puzzle], height = size === 6 ? 2 : 3
  let count = 0
  function search() {
    let chosen = -1, options = null
    for (let index = 0; index < values.length; index++) {
      if (values[index]) continue
      const row = Math.floor(index / size), column = index % size, used = new Set()
      for (let offset = 0; offset < size; offset++) { used.add(values[row * size + offset]); used.add(values[offset * size + column]) }
      const firstRow = Math.floor(row / height) * height, firstColumn = Math.floor(column / 3) * 3
      for (let r = firstRow; r < firstRow + height; r++) for (let c = firstColumn; c < firstColumn + 3; c++) used.add(values[r * size + c])
      const available = Array.from({ length: size }, (_, i) => i + 1).filter((number) => !used.has(number))
      if (!available.length) return
      if (options === null || available.length < options.length) { chosen = index; options = available }
    }
    if (chosen === -1) { count++; return }
    for (const number of options) { values[chosen] = number; search(); values[chosen] = 0; if (count >= 2) return }
  }
  search()
  return count
}

for (const size of [6, 9]) for (const difficulty of ['easy', 'normal', 'hard', 'expert', 'impossible']) {
  test(`${size}x${size} ${difficulty}: valid clues, valid solution, independently unique`, () => {
    for (let sample = 0; sample < 3; sample++) {
      const generated = generateClassic(size, difficulty, { random: seeded(size * 100 + sample + difficulty.length * 9) })
      assert.ok(generated.puzzle.some((number) => number === 0))
      assert.ok(generated.puzzle.some(Boolean))
      assert.equal(countIndependently(generated.puzzle, size), 1)
      assert.ok(generated.puzzle.every((number, index) => number === 0 || number === generated.solution[index]))
      const height = size === 6 ? 2 : 3
      for (let row = 0; row < size; row++) {
        assert.equal(new Set(generated.solution.slice(row * size, (row + 1) * size)).size, size)
        assert.equal(new Set(Array.from({ length: size }, (_, column) => generated.solution[column * size + row])).size, size)
      }
      for (let row = 0; row < size; row += height) for (let column = 0; column < size; column += 3) {
        const box = []
        for (let r = row; r < row + height; r++) for (let c = column; c < column + 3; c++) box.push(generated.solution[r * size + c])
        assert.equal(new Set(box).size, size)
      }
      if (difficulty === 'easy') assert.equal(generated.rating.technique, 'naked-singles')
      if (difficulty === 'normal') assert.notEqual(generated.rating.technique, 'search')
    }
  })
}

test('solver rejects conflicting givens, detects multiple solutions, and reports exhausted searches', () => {
  const conflict = Array(36).fill(0); conflict[0] = 1; conflict[1] = 1
  assert.equal(solveClassic(conflict, 6).count, 0)
  assert.equal(solveClassic(Array(36).fill(0), 6).count, 2)
  assert.equal(solveClassic(Array(36).fill(0), 6, { nodeLimit: 1 }).exhausted, true)
  assert.throws(() => generateClassic(4))
  assert.throws(() => generateClassic(9, 'unknown'))
})

test('Classic gameplay protects givens, handles notes and mistakes, completes and persists', () => {
  const values = new Map(), storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const user = { username: 'Player' }, pen = { fontFamily: 'Intel One Mono', fontWeight: 'normal' }
  const generatedPuzzle = generateClassic(6, 'easy', { random: seeded(77) })
  const board = createSavedBoard({ size: 6, difficulty: 'easy', type: 'classic', user, generatedPuzzle }, storage)
  assert.ok(board instanceof Board)
  let state = createBoardState(board)
  const given = board.cells.findIndex(Boolean), empty = board.cells.findIndex((cell) => cell === null)
  state = boardReducer(state, { type: 'select', index: given })
  assert.equal(boardReducer(state, { type: 'erase' }), state)
  assert.equal(boardReducer(state, { type: 'enter', number: 1, user, pen }), state)
  state = boardReducer(state, { type: 'select', index: empty })
  const wrong = board.solution[empty] % 6 + 1
  state = boardReducer(state, { type: 'enter', number: wrong, user, pen })
  assert.equal(state.board.livesUsed, 1)
  assert.equal(state.board.cells[empty], null)
  state = boardReducer(state, { type: 'toggle-notes' })
  state = boardReducer(state, { type: 'enter', number: wrong, user, pen })
  assert.equal(state.board.livesUsed, 1)
  assert.equal(state.board.cells[empty].kind, 'note')
  state = boardReducer(state, { type: 'toggle-notes' })
  state = boardReducer(state, { type: 'enter', number: board.solution[empty], user, pen })
  state = boardReducer(state, { type: 'erase' })
  assert.equal(state.board.cells[empty], null)
  for (let index = 0; index < board.cells.length; index++) {
    if (board.cells[index]) continue
    if (state.selected !== index) state = boardReducer(state, { type: 'select', index })
    state = boardReducer(state, { type: 'enter', number: board.solution[index], user, pen })
  }
  assert.ok(state.board.completedAt)
  assert.equal(state.message, 'Puzzle complete!')
  saveBoard(state.board, storage)
  const restored = loadBoard(user, storage)
  assert.deepEqual(restored.cells, state.board.cells)
  assert.deepEqual(restored.solution, board.solution)
  assert.equal(restored.completedAt, state.board.completedAt)
})


test('fifth incorrect guess freezes the board and saves its failure timestamp', () => {
  const user = { username: 'Player' }, pen = { fontFamily: 'Intel One Mono' }
  const generatedPuzzle = generateClassic(6, 'easy', { random: seeded(88) })
  const board = new Board({ size: 6, user, generatedPuzzle })
  const empty = board.cells.findIndex((cell) => cell === null)
  let state = boardReducer(createBoardState(board), { type: 'select', index: empty })
  const wrong = board.solution[empty] % 6 + 1
  for (let lives = 1; lives <= 5; lives++) {
    state = boardReducer(state, { type: 'enter', number: wrong, user, pen })
    assert.equal(state.board.livesUsed, lives)
    assert.equal(Boolean(state.board.failedAt), lives === 5)
  }
  assert.equal(state.board.completedAt, null)
  assert.equal(boardReducer(state, { type: 'enter', number: board.solution[empty], user, pen }), state)
  assert.equal(boardReducer(state, { type: 'erase' }), state)
  assert.equal(boardReducer(state, { type: 'toggle-notes' }), state)
})
