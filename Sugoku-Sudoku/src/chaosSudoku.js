import { generateClassic, solveClassic } from './classicSudoku.js'

export const regionColors = ['#FF8A80', '#FFBE66', '#FFEB62', '#9DDA70', '#54DCC3', '#70C8FF', '#9BA1FF', '#CD8EF0', '#F18BCB']

export function regionAt(board, index) {
  return board.regions?.[index] ?? Math.floor(Math.floor(index / board.size) / (board.boxRows || (board.size === 6 ? 2 : 3))) * (board.size / 3) + Math.floor(index % board.size / 3)
}

function neighbors(index, size) {
  return [index % size ? index - 1 : -1, index % size < size - 1 ? index + 1 : -1, index - size, index + size].filter((cell) => cell >= 0 && cell < size * size)
}

function connected(regions, region, size) {
  const start = regions.indexOf(region), seen = new Set([start]), pending = [start]
  while (pending.length) for (const cell of neighbors(pending.pop(), size)) {
    if (regions[cell] === region && !seen.has(cell)) { seen.add(cell); pending.push(cell) }
  }
  return seen.size === size
}

// Trade equal digits along region boundaries: sizes and solution validity stay intact.
export function generateChaos(size, difficulty = 'easy', { random = Math.random, attempts = 24 } = {}) {
  if (size !== 6 && size !== 9) throw new Error('Chaos supports only 6x6 and 9x9 boards.')
  for (let attempt = 0; attempt < 40; attempt++) {
    const solution = solveClassic(Array(size * size).fill(0), size, { limit: 1, random }).solution
    if (!solution) continue
    const regions = Array.from({ length: size * size }, (_, index) => regionAt({ size }, index))
    const original = [...regions]
    for (let round = 0; round < size * 5; round++) {
      const candidates = []
      for (let a = 0; a < regions.length; a++) for (let b = a + 1; b < regions.length; b++) {
        if (regions[a] === regions[b] || solution[a] !== solution[b]) continue
        if (!neighbors(a, size).some((cell) => cell !== b && regions[cell] === regions[b]) || !neighbors(b, size).some((cell) => cell !== a && regions[cell] === regions[a])) continue
        candidates.push([a, b])
      }
      if (!candidates.length) break
      const [a, b] = candidates[Math.floor(random() * candidates.length)]
      const first = regions[a], second = regions[b]
      regions[a] = second; regions[b] = first
      if (!connected(regions, first, size) || !connected(regions, second, size)) { regions[a] = first; regions[b] = second }
    }
    if (regions.every((region, index) => region === original[index])) continue
    return { ...generateClassic(size, difficulty, { random, attempts, regions, fixedSolution: solution }), regions }
  }
  throw new Error('Could not generate a Chaos puzzle. Please try again.')
}
