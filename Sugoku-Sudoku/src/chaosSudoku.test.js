import test from 'node:test'
import assert from 'node:assert/strict'
import { generateChaos, generateChaosRegions, solveChaos, regionAt, regionColors, gridColorsForPlayers } from './chaosSudoku.js'
import { solveClassic } from './classicSudoku.js'
import { Board, boardReducer, createBoardState, userColors, isRelatedCell } from './boardState.js'
import { completionFlashes } from './boardCelebration.js'

test('grid palette stays distinct from player colors, including existing matching assignments', () => {
  assert.equal(new Set(regionColors).size, 9)
  for (const grid of regionColors) for (const player of userColors) {
    assert.notEqual(grid, player)
    const rgb = (hex) => [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16))
    assert.ok(Math.hypot(...rgb(grid).map((channel, index) => channel - rgb(player)[index])) > 64)
  }
  const players = regionColors.map((color) => color.toLowerCase())
  const adjusted = gridColorsForPlayers(players)
  assert.equal(new Set(adjusted).size, 9)
  assert.ok(adjusted.every((color) => !players.includes(color.toLowerCase())))
  assert.deepEqual(gridColorsForPlayers(userColors), regionColors)
  assert.notEqual(gridColorsForPlayers([regionColors[0]])[0], regionColors[0])
  assert.equal(gridColorsForPlayers(['#fff'])[0], regionColors[0])
})

for (const size of [6, 9]) for (const difficulty of ['easy', 'normal', 'hard', 'expert', 'impossible']) {
  test(`Chaos ${size} ${difficulty}: connected, balanced regions and unique puzzle`, () => {
    let seed = size * 17 + difficulty.length
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32 }
    const generated = generateChaos(size, difficulty, { random, attempts: 3 })
    assert.ok(generated.regions.some((region, index) => region !== regionAt({ size }, index)))
    for (let region = 0; region < size; region++) {
      const cells = generated.regions.flatMap((entry, index) => entry === region ? [index] : [])
      assert.equal(cells.length, size)
      assert.equal(new Set(cells.map((index) => generated.solution[index])).size, size)
      const seen = new Set([cells[0]]), queue = [cells[0]]
      while (queue.length) {
        const index = queue.pop()
        for (const next of cells) if (!seen.has(next) && Math.abs(Math.floor(next / size) - Math.floor(index / size)) + Math.abs(next % size - index % size) === 1) { seen.add(next); queue.push(next) }
      }
      assert.equal(seen.size, size)
    }
    const solved = solveChaos(generated.puzzle, size, { regions: generated.regions })
    assert.equal(solved.exhausted, false)
    assert.equal(solved.count, 1)
    assert.deepEqual(solved.solution, generated.solution)
    const board = new Board({ size, type: 'chaos', generatedPuzzle: generated })
    assert.deepEqual(board.regions, generated.regions)
    assert.deepEqual(JSON.parse(JSON.stringify(board)).regions, generated.regions)
    const selected = generated.puzzle.indexOf(0), number = generated.solution[selected]
    const notes = board.cells.map((cell, index) => index === selected ? null : cell || { kind: 'note', numbers: [{ number }] })
    const state = { ...createBoardState(board), selected, board: { ...board, cells: notes } }
    const updated = boardReducer(state, { type: 'enter', number, user: { username: 'Guest' }, pen: {} })
    notes.forEach((cell, index) => {
      if (cell?.kind !== 'note') return
      const related = Math.floor(index / size) === Math.floor(selected / size) || index % size === selected % size || generated.regions[index] === generated.regions[selected]
      assert.equal(updated.board.cells[index] === null, related)
    })
    for (let row = 0; row < size; row++) {
      assert.equal(new Set(generated.solution.slice(row * size, (row + 1) * size)).size, size)
      assert.equal(new Set(Array.from({ length: size }, (_, r) => generated.solution[r * size + row])).size, size)
    }
    const filled = board.cells.map((cell, index) => generated.regions[index] === generated.regions[selected] ? { kind: 'number', number: generated.solution[index] } : null)
    assert.deepEqual(new Set(completionFlashes(board, filled, selected).map((flash) => flash.index)), new Set(generated.regions.flatMap((region, index) => region === generated.regions[selected] ? [index] : [])))
  })
}

test('Chaos region peers receive the same related highlight as row and column peers', () => {
  const regions = Array(36).fill(1)
  regions[0] = regions[14] = 0
  assert.equal(isRelatedCell(14, 0, 6, regions), true)
  assert.equal(isRelatedCell(1, 0, 6, regions), true)
  assert.equal(isRelatedCell(6, 0, 6, regions), true)
  assert.equal(isRelatedCell(7, 0, 6, regions), false)
  assert.equal(isRelatedCell(0, 0, 6, regions), false)
  assert.equal(isRelatedCell(14, null, 6, regions), false)
  assert.equal(isRelatedCell(14, 0, 6), false)
})

for (const size of [6, 9]) test(`${size}x${size} regions vary substantially across many seeds`, () => {
  const layouts = new Set()
  for (let seedIndex = 1; seedIndex <= 40; seedIndex++) {
    let seed = seedIndex
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32 }
    const regions = generateChaosRegions(size, { random })
    layouts.add(regions.join(','))
    let irregular = 0
    for (let region = 0; region < size; region++) {
      const cells = regions.flatMap((entry, index) => entry === region ? [index] : [])
      assert.equal(cells.length, size)
      const connected = new Set([cells[0]]), queue = [cells[0]]
      while (queue.length) {
        const cell = queue.pop()
        for (const next of cells) if (!connected.has(next) && Math.abs(Math.floor(cell / size) - Math.floor(next / size)) + Math.abs(cell % size - next % size) === 1) { connected.add(next); queue.push(next) }
      }
      assert.equal(connected.size, size)
      const boxes = new Map()
      cells.forEach((index) => { const box = regionAt({ size }, index); boxes.set(box, (boxes.get(box) || 0) + 1) })
      assert.ok(Math.max(...boxes.values()) <= size - 2)
      const rows = cells.map((index) => Math.floor(index / size)), columns = cells.map((index) => index % size)
      if ((Math.max(...rows) - Math.min(...rows) + 1) * (Math.max(...columns) - Math.min(...columns) + 1) > size) irregular++
    }
    assert.equal(irregular, size)
  }
  assert.equal(layouts.size, 40)
})

for (const size of [6, 9]) test(`${size}x${size} Chaos enforces colored regions and permits Classic-box repeats`, () => {
  let seed = size * 199
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32 }
  const generated = generateChaos(size, 'easy', { random, attempts: 1 })
  assert.equal(solveChaos(generated.solution, size, { regions: generated.regions }).count, 1)
  assert.equal(solveClassic(generated.solution, size).count, 0)
  let first = -1, second = -1
  for (let a = 0; a < size * size && second < 0; a++) {
    const b = generated.regions.findIndex((region, index) => region === generated.regions[a] && Math.floor(index / size) !== Math.floor(a / size) && index % size !== a % size)
    if (b >= 0) { first = a; second = b }
  }
  assert.ok(first >= 0 && second >= 0)
  const partial = Array(size * size).fill(0)
  partial[first] = partial[second] = generated.solution[first]
  assert.equal(solveChaos(partial, size, { regions: generated.regions }).count, 0)
  // Even a stale cached solution cannot permit a duplicate within a region.
  const board = new Board({ size, type: 'chaos', generatedPuzzle: generated })
  board.cells = Array(size * size).fill(null)
  board.cells[first] = { kind: 'number', number: generated.solution[first], given: true }
  board.solution = [...generated.solution]
  board.solution[second] = generated.solution[first]
  const state = { ...createBoardState(board), selected: second }
  const updated = boardReducer(state, { type: 'enter', number: generated.solution[first], user: { username: 'Guest' }, pen: {} })
  assert.equal(updated.board.cells[second], null)
  assert.equal(updated.board.livesUsed, 1)
  assert.throws(() => solveChaos(partial, size), /requires the board regions/)
})
