import test from 'node:test'
import assert from 'node:assert/strict'
import { generateCages, generateKiller } from './killerSudoku.js'
import { solveClassic } from './classicSudoku.js'
import { Board } from './boardState.js'
import { saveBoard, getBoard } from './boardStore.js'

for (const size of [6, 9]) {
  test(`${size}x${size} killer cages cover the board, connect, and preserve sums and colors`, () => {
    const generated = generateKiller(size)
    assert.equal(solveClassic(generated.puzzle, size).count, 1)
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
