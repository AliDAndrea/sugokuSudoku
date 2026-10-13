import test from 'node:test'
import assert from 'node:assert/strict'
import { generateChaos, regionAt } from './chaosSudoku.js'
import { solveClassic } from './classicSudoku.js'
import { Board, boardReducer, createBoardState } from './boardState.js'
import { completionFlashes } from './boardCelebration.js'

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
