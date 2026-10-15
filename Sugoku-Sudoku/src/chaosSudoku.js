import { generateClassic, solveClassic } from './classicSudoku.js'

export const regionColors = ['#FF8A80', '#FFD28A', '#FFF39B', '#9DDA70', '#54DCC3', '#70C8FF', '#9BA1FF', '#CD8EF0', '#F6B4CD']

export function gridColorsForPlayers(playerColors = []) {
  const normalize = (color) => color.toUpperCase().replace(/^#([0-9A-F])([0-9A-F])([0-9A-F])$/, '#$1$1$2$2$3$3')
  const unavailable = new Set(playerColors.map(normalize))
  return regionColors.map((base) => {
    let color = base, shade = 0
    // Keep the region's hue, adjusting its lightness only when a player uses it.
    while (unavailable.has(color)) {
      shade += 0.04
      color = '#' + [1, 3, 5].map((offset) => {
        const channel = parseInt(base.slice(offset, offset + 2), 16)
        return Math.round(channel + (255 - channel) * shade).toString(16).padStart(2, '0')
      }).join('').toUpperCase()
    }
    unavailable.add(color)
    return color
  })
}

export function regionAt(board, index) {
  return board.regions?.[index] ?? Math.floor(Math.floor(index / board.size) / (board.boxRows || (board.size === 6 ? 2 : 3))) * (board.size / 3) + Math.floor(index % board.size / 3)
}

function neighbors(index, size) {
  return [index % size ? index - 1 : -1, index % size < size - 1 ? index + 1 : -1, index - size, index + size].filter((cell) => cell >= 0 && cell < size * size)
}

export function solveChaos(puzzle, size, options = {}) {
  if (!Array.isArray(options.regions) || options.regions.length !== size * size) throw new Error('Chaos solving requires the board regions.')
  return solveClassic(puzzle, size, options)
}

// A randomized board-spanning path gives equal-sized, connected regions without
// starting from Classic boxes. Backbite moves fold and untangle the whole path.
export function generateChaosRegions(size, { random = Math.random } = {}) {
  if (size !== 6 && size !== 9) throw new Error('Chaos supports only 6x6 and 9x9 boards.')
  const count = size * size
  const adjacent = Array.from({ length: count }, (_, index) => neighbors(index, size))
  for (let attempt = 0; attempt < 100; attempt++) {
    let path = Array.from({ length: count }, (_, index) => {
      const row = Math.floor(index / size), column = index % size
      return row * size + (row % 2 ? size - 1 - column : column)
    })
    const positions = new Int16Array(count)
    for (let step = 0; step < count * 80; step++) {
      if (random() < 0.5) path.reverse()
      path.forEach((cell, index) => { positions[cell] = index })
      const options = adjacent[path[0]].filter((cell) => positions[cell] > 1)
      if (!options.length) continue
      const end = positions[options[Math.floor(random() * options.length)]]
      path = [...path.slice(0, end).reverse(), ...path.slice(end)]
    }
    const regions = Array(count)
    path.forEach((cell, index) => { regions[cell] = Math.floor(index / size) })
    let irregular = 0, scattered = true
    for (let region = 0; region < size; region++) {
      const cells = path.slice(region * size, (region + 1) * size)
      const rows = cells.map((cell) => Math.floor(cell / size)), columns = cells.map((cell) => cell % size)
      if ((Math.max(...rows) - Math.min(...rows) + 1) * (Math.max(...columns) - Math.min(...columns) + 1) > size) irregular++
      const overlaps = new Map()
      for (const cell of cells) {
        const box = regionAt({ size }, cell)
        overlaps.set(box, (overlaps.get(box) || 0) + 1)
      }
      // No region may look like a Classic box with just one tile traded away.
      if (Math.max(...overlaps.values()) > size - 2) scattered = false
    }
    if (scattered && irregular === size) return regions
  }
  throw new Error('Could not generate scattered Chaos regions. Please try again.')
}

export function generateChaos(size, difficulty = 'easy', { random = Math.random, attempts = 24 } = {}) {
  // Some connected partitions have no valid Sudoku filling. Retry the shapes,
  // and only remove clues after finding a solution under the colored regions.
  for (let attempt = 0; attempt < 40; attempt++) {
    const regions = generateChaosRegions(size, { random })
    const { solution } = solveChaos(Array(size * size).fill(0), size, { regions, random, limit: 1 })
    if (!solution) continue
    return { ...generateClassic(size, difficulty, { random, attempts, regions, fixedSolution: solution }), regions }
  }
  throw new Error('Could not generate a valid Chaos puzzle. Please try again.')
}
