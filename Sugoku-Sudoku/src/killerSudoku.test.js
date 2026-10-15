import test from 'node:test'
import assert from 'node:assert/strict'
import { generateCages, generateKiller } from './killerSudoku.js'
import { solveClassic } from './classicSudoku.js'
import { Board } from './boardState.js'
import { saveBoard, getBoard } from './boardStore.js'

for (const size of [6, 9]) {
  test(`${size}x${size} starting clues decrease, with none on Expert or Impossible`, () => {
    let previousClues = size * size
    for (const difficulty of ['easy', 'normal', 'hard', 'expert', 'impossible']) {
      const generated = generateKiller(size, difficulty)
      const clues = generated.puzzle.filter(Boolean).length
      const expectedClues = size === 6
        ? { easy: 8, normal: 5, hard: 2, expert: 0, impossible: 0 }
        : { easy: 14, normal: 8, hard: 4, expert: 0, impossible: 0 }
      assert.equal(clues, expectedClues[difficulty])
      assert.equal(generated.rating.clues, clues)
      assert.ok(generated.puzzle.every((number, index) => !number || number === generated.solution[index]))
      if (difficulty === 'expert' || difficulty === 'impossible') {
        assert.equal(clues, 0)
        assert.equal(generated.rating.clues, 0)
        const board = new Board({ size, type: 'killer', difficulty, generatedPuzzle: generated })
        assert.ok(board.cells.every((cell) => cell === null))
        assert.deepEqual(board.solution, generated.solution)
        assert.ok(board.cages.length > 0)
      } else {
        assert.ok(clues > 0 && clues < previousClues)
      }
      previousClues = clues
    }
  })

  test(`${size}x${size} cages grow with difficulty and Impossible never has singletons`, () => {
    const solution = solveClassic(Array(size * size).fill(0), size, { limit: 1 }).solution
    let seed = 42
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 0x100000000 }
    let previousAverage = 0
    for (const difficulty of ['easy', 'normal', 'hard', 'expert', 'impossible']) {
      let count = 0
      for (let sample = 0; sample < 40; sample++) {
        const cages = generateCages(solution, size, random, difficulty)
        count += cages.length
        assert.deepEqual(cages.flatMap((cage) => cage.cells).sort((a, b) => a - b), solution.map((_, index) => index))
        for (const cage of cages) {
          assert.equal(new Set(cage.cells.map((cell) => solution[cell])).size, cage.cells.length)
          assert.equal(cage.sum, cage.cells.reduce((sum, cell) => sum + solution[cell], 0))
          if (difficulty === 'impossible') assert.ok(cage.cells.length >= 2)
          const reached = new Set([cage.cells[0]])
          for (let pass = 0; pass < cage.cells.length; pass++) for (const cell of cage.cells) {
            if ([...reached].some((other) => Math.abs(Math.floor(cell / size) - Math.floor(other / size)) + Math.abs(cell % size - other % size) === 1)) reached.add(cell)
          }
          assert.equal(reached.size, cage.cells.length)
        }
      }
      const average = 40 * size * size / count
      assert.ok(average > previousAverage, `${difficulty} average ${average} must exceed ${previousAverage}`)
      previousAverage = average
    }
    // Exercise both extreme random choices, including the guaranteed partition fallback.
    for (const random of [() => 0, () => 0.999]) {
      assert.ok(generateCages(solution, size, random, 'impossible').every((cage) => cage.cells.length >= 2))
    }
  })

  test(`${size}x${size} killer cages cover the board, connect, and preserve sums and colors`, () => {
    const generated = generateKiller(size)
    assert.deepEqual(solveClassic(generated.solution, size).solution, generated.solution)
    const board = new Board({ size, type: 'killer', generatedPuzzle: generated })
    const cages = board.cages
    assert.deepEqual(cages.flatMap((cage) => cage.cells).sort((a, b) => a - b), Array.from({ length: size * size }, (_, i) => i))
    for (const cage of cages) {
      assert.equal(cage.sum, cage.cells.reduce((sum, cell) => sum + board.solution[cell], 0))
      assert.equal(new Set(cage.cells.map((cell) => board.solution[cell])).size, cage.cells.length)
      assert.ok(cage.cells.length <= 5)
      const reached = new Set([cage.cells[0]])
      for (let pass = 0; pass < cage.cells.length; pass++) for (const cell of cage.cells) {
        if ([...reached].some((other) => Math.abs(Math.floor(cell / size) - Math.floor(other / size)) + Math.abs(cell % size - other % size) === 1)) reached.add(cell)
      }
      assert.equal(reached.size, cage.cells.length)
      for (const cell of cage.cells) for (const neighbor of [cell % size < size - 1 ? cell + 1 : -1, cell + size < size * size ? cell + size : -1]) {
        const other = cages.find((entry) => entry.cells.includes(neighbor))
        if (other && other !== cage) assert.notEqual(other.color, cage.color)
      }
    }
    assert.notDeepEqual(generateCages(board.solution, size, () => 0), generateCages(board.solution, size, () => 0.9))
    const values = new Map()
    const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
    saveBoard(board, storage)
    assert.deepEqual(getBoard(board.id, board.createdBy, storage).cages, cages)
  })
}
