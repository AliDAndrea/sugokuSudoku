import test from 'node:test'
import assert from 'node:assert/strict'
import { generateChaos, regionAt, regionColors, gridColorsForPlayers } from './chaosSudoku.js'
import { solveClassic } from './classicSudoku.js'
import { Board, boardReducer, createBoardState, userColors } from './boardState.js'
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
    const solved = solveClassic(generated.puzzle, size, { regions: generated.regions })
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
    const filled = board.cells.map((cell, index) => generated.regions[index] === generated.regions[selected] ? { kind: 'number', number: generated.solution[index] } : null)
    assert.deepEqual(new Set(completionFlashes(board, filled, selected).map((flash) => flash.index)), new Set(generated.regions.flatMap((region, index) => region === generated.regions[selected] ? [index] : [])))
  })
}
