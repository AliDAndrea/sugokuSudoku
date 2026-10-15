import { generateClassic } from './classicSudoku.js'

const cageColors = ['#f5c5c5', '#c6dfb8', '#c5d8f4', '#f5dfaa', '#dec8ed', '#b9e3dd']
const startingClues = {
  6: { easy: 8, normal: 5, hard: 2, expert: 0, impossible: 0 },
  9: { easy: 14, normal: 8, hard: 4, expert: 0, impossible: 0 },
}
const cageSizes = {
  easy: { average: 1.8, maximum: 3 },
  normal: { average: 2.4, maximum: 4 },
  hard: { average: 3, maximum: 5 },
  expert: { average: 3.8, maximum: 6 },
  impossible: { average: 4.5, maximum: 9 },
}

function neighbors(index, size) {
  const row = Math.floor(index / size), column = index % size
  return [row > 0 ? index - size : -1, column > 0 ? index - 1 : -1,
    column < size - 1 ? index + 1 : -1, row < size - 1 ? index + size : -1].filter((cell) => cell >= 0)
}

export function generateCages(solution, size, random = Math.random, difficulty = 'easy') {
  const configuration = cageSizes[difficulty]
  if (!configuration) throw new Error('Choose a valid Killer difficulty.')
  const maximum = Math.min(size, configuration.maximum)
  const pick = (values) => values[Math.floor(random() * values.length)]
  let cages = solution.map((_, index) => ({ cells: [index] }))
  if (difficulty === 'impossible') {
    // Partition a snake path into adjacent pairs (and one triple on 9x9).
    // Starting without singletons guarantees none can be stranded by merging.
    const transpose = random() < 0.5, flipRows = random() < 0.5, flipColumns = random() < 0.5
    const path = solution.map((_, index) => {
      let row = Math.floor(index / size), column = row % 2 ? size - 1 - index % size : index % size
      if (transpose) [row, column] = [column, row]
      if (flipRows) row = size - 1 - row
      if (flipColumns) column = size - 1 - column
      return row * size + column
    })
    cages = []
    for (let index = 0; index < path.length;) {
      const length = index === 0 && size % 2 ? 3 : 2
      cages.push({ cells: path.slice(index, index + length) })
      index += length
    }
  }
  const target = Math.ceil(solution.length / configuration.average)
  while (cages.length > target) {
    const owners = Array(solution.length)
    cages.forEach((cage, id) => cage.cells.forEach((cell) => { owners[cell] = id }))
    const candidates = []
    cages.forEach((cage, id) => {
      const adjacent = new Set(cage.cells.flatMap((cell) => neighbors(cell, size)).map((cell) => owners[cell]))
      for (const other of adjacent) {
        if (other <= id) continue
        const cells = [...cage.cells, ...cages[other].cells]
        if (cells.length <= maximum && new Set(cells.map((cell) => solution[cell])).size === cells.length) candidates.push([id, other])
      }
    })
    if (!candidates.length) break
    const [first, second] = pick(candidates)
    cages[first].cells.push(...cages[second].cells)
    cages.splice(second, 1)
  }
  cages.forEach((cage) => {
    cage.cells.sort((a, b) => a - b)
    cage.sum = cage.cells.reduce((sum, cell) => sum + solution[cell], 0)
  })
  // Greedy coloring ensures cages sharing an edge always have different fills.
  const owners = Array(size * size)
  cages.forEach((cage, id) => cage.cells.forEach((cell) => { owners[cell] = id }))
  cages.forEach((cage, id) => {
    const used = new Set(cage.cells.flatMap((cell) => neighbors(cell, size))
      .map((cell) => owners[cell]).filter((owner) => owner < id).map((owner) => cages[owner].color))
    cage.color = cageColors.find((color) => !used.has(color)) || `hsl(${id * 137.508 % 360} 55% 82%)`
  })
  return cages
}

export function generateKiller(size = 9, difficulty = 'easy') {
  const generated = generateClassic(size, difficulty)
  const clues = startingClues[size][difficulty]
  const puzzle = [...generated.puzzle]
  const filled = puzzle.flatMap((number, index) => number ? [index] : [])
  while (filled.length > clues) {
    const choice = Math.floor(Math.random() * filled.length)
    puzzle[filled[choice]] = 0
    filled.splice(choice, 1)
  }
  return {
    ...generated,
    puzzle,
    rating: { ...generated.rating, clues: filled.length },
    cages: generateCages(generated.solution, size, Math.random, difficulty),
  }
}
