import { generateClassic } from './classicSudoku.js'

const cageColors = ['#f5c5c5', '#c6dfb8', '#c5d8f4', '#f5dfaa', '#dec8ed', '#b9e3dd']

function neighbors(index, size) {
  const row = Math.floor(index / size), column = index % size
  return [row > 0 ? index - size : -1, column > 0 ? index - 1 : -1,
    column < size - 1 ? index + 1 : -1, row < size - 1 ? index + size : -1].filter((cell) => cell >= 0)
}

export function generateCages(solution, size, random = Math.random) {
  const remaining = new Set(solution.map((_, index) => index))
  const cages = []
  const pick = (values) => values[Math.floor(random() * values.length)]
  while (remaining.size) {
    const cells = [pick([...remaining])]
    remaining.delete(cells[0])
    const digits = new Set([solution[cells[0]]])
    const target = 2 + Math.floor(random() * 4)
    while (cells.length < target) {
      const candidates = [...new Set(cells.flatMap((cell) => neighbors(cell, size)))]
        .filter((cell) => remaining.has(cell) && !digits.has(solution[cell]))
      if (!candidates.length) break
      const cell = pick(candidates)
      cells.push(cell)
      remaining.delete(cell)
      digits.add(solution[cell])
    }
    cells.sort((a, b) => a - b)
    cages.push({ cells, sum: cells.reduce((sum, cell) => sum + solution[cell], 0) })
  }
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
  // Retain uniquely solvable clues; cage sums provide additional constraints.
  const generated = generateClassic(size, difficulty)
  return { ...generated, cages: generateCages(generated.solution, size) }
}
