// Bitmask constraints and minimum-remaining-values search. No puzzle service required.
const configurations = {
  6: { easy: 22, normal: 18, hard: 15, expert: 12, impossible: 10 },
  9: { easy: 46, normal: 38, hard: 32, expert: 27, impossible: 24 },
}
const cache = new Map()
const popcount = (mask) => { let count = 0; for (; mask; mask &= mask - 1) count++; return count }
const digit = (bit) => 32 - Math.clz32(bit)

function topology(size) {
  if (!configurations[size]) throw new Error('Classic supports only 6x6 and 9x9 boards.')
  if (cache.has(size)) return cache.get(size)
  const boxHeight = size === 6 ? 2 : 3
  const boxesAcross = size / 3
  const units = Array.from({ length: size * 3 }, () => [])
  const cells = Array.from({ length: size * size }, (_, index) => {
    const row = Math.floor(index / size), column = index % size
    const box = Math.floor(row / boxHeight) * boxesAcross + Math.floor(column / 3)
    const groups = [row, size + column, size * 2 + box]
    groups.forEach((group) => units[group].push(index))
    return { row, column, box, groups }
  })
  const peers = cells.map(({ groups }, index) => [...new Set(groups.flatMap((group) => units[group]))].filter((peer) => peer !== index))
  const result = { cells, units, peers, full: (1 << size) - 1 }
  cache.set(size, result)
  return result
}

function shuffle(values, random) {
  for (let index = values.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1))
    ;[values[index], values[other]] = [values[other], values[index]]
  }
  return values
}

export function solveClassic(puzzle, size, { limit = 2, nodeLimit = 100000, random = null } = {}) {
  const { cells, full } = topology(size)
  if (puzzle.length !== size * size) throw new Error('Invalid puzzle length.')
  const values = [...puzzle], rows = new Uint16Array(size), columns = new Uint16Array(size), boxes = new Uint16Array(size)
  let count = 0, solution = null, nodes = 0, branches = 0, exhausted = false
  for (let index = 0; index < values.length; index++) {
    const value = values[index]
    if (!Number.isInteger(value) || value < 0 || value > size) return { count: 0, solution, nodes, branches, exhausted }
    if (!value) continue
    const bit = 1 << (value - 1), { row, column, box } = cells[index]
    if ((rows[row] | columns[column] | boxes[box]) & bit) return { count: 0, solution, nodes, branches, exhausted }
    rows[row] |= bit; columns[column] |= bit; boxes[box] |= bit
  }
  function search() {
    if (++nodes > nodeLimit) { exhausted = true; return }
    let selected = -1, choices = 0, minimum = size + 1
    for (let index = 0; index < values.length; index++) {
      if (values[index]) continue
      const { row, column, box } = cells[index]
      const mask = full & ~(rows[row] | columns[column] | boxes[box])
      const remaining = popcount(mask)
      if (!remaining) return
      if (remaining < minimum) { selected = index; choices = mask; minimum = remaining; if (remaining === 1) break }
    }
    if (selected === -1) { count++; if (!solution) solution = [...values]; return }
    if (minimum > 1) branches++
    const options = []
    for (let mask = choices; mask; mask &= mask - 1) options.push(mask & -mask)
    if (random) shuffle(options, random)
    const { row, column, box } = cells[selected]
    for (const bit of options) {
      values[selected] = digit(bit)
      rows[row] |= bit; columns[column] |= bit; boxes[box] |= bit
      search()
      rows[row] ^= bit; columns[column] ^= bit; boxes[box] ^= bit
      values[selected] = 0
      if (count >= limit || exhausted) return
    }
  }
  search()
  return { count, solution, nodes, branches, exhausted }
}

// Rate using naked/hidden singles, then measure the remaining constrained search.
export function rateClassic(puzzle, size) {
  const { cells, units, full } = topology(size)
  const values = [...puzzle]
  let hiddenSingles = 0
  for (;;) {
    const candidates = values.map((value, index) => {
      if (value) return 0
      let used = 0
      for (const group of cells[index].groups) for (const peer of units[group]) if (values[peer]) used |= 1 << (values[peer] - 1)
      return full & ~used
    })
    const single = candidates.findIndex((mask) => mask && !(mask & (mask - 1)))
    if (single !== -1) { values[single] = digit(candidates[single]); continue }
    let found = false
    for (const unit of units) {
      for (let bit = 1; bit <= full; bit <<= 1) {
        const locations = unit.filter((index) => candidates[index] & bit)
        if (locations.length === 1) { values[locations[0]] = digit(bit); hiddenSingles++; found = true; break }
      }
      if (found) break
    }
    if (!found) break
  }
  const search = values.every(Boolean) ? { branches: 0, nodes: 0 } : solveClassic(values, size, { limit: 1 })
  return { technique: search.branches ? 'search' : hiddenSingles ? 'hidden-singles' : 'naked-singles', hiddenSingles, branches: search.branches, nodes: search.nodes }
}

export function generateClassic(size, difficulty = 'easy', { random = Math.random, attempts = 24 } = {}) {
  topology(size)
  const target = configurations[size][difficulty]
  if (!target) throw new Error('Choose a valid Classic difficulty.')
  let best = null, bestScore = -Infinity
  for (let attempt = 0; attempt < attempts; attempt++) {
    const solution = solveClassic(Array(size * size).fill(0), size, { limit: 1, random }).solution
    if (!solution) continue
    const puzzle = [...solution]
    let clues = puzzle.length
    for (const index of shuffle(Array.from({ length: puzzle.length }, (_, index) => index), random)) {
      if (clues <= target) break
      const value = puzzle[index]
      puzzle[index] = 0
      const check = solveClassic(puzzle, size, { nodeLimit: 20000 })
      // An interrupted search is never accepted as a uniqueness proof.
      if (check.count !== 1 || check.exhausted) { puzzle[index] = value; continue }
      if (difficulty === 'easy' && rateClassic(puzzle, size).technique !== 'naked-singles') { puzzle[index] = value; continue }
      if (difficulty === 'normal' && rateClassic(puzzle, size).technique === 'search') { puzzle[index] = value; continue }
      clues--
    }
    const rating = rateClassic(puzzle, size)
    const score = (size * size - clues) * 2 + rating.hiddenSingles + Math.log2(1 + rating.nodes) * 12 + rating.branches * 3
    if (score > bestScore) { bestScore = score; best = { puzzle, solution, rating: { ...rating, score, clues }, boxRows: size === 6 ? 2 : 3, boxColumns: 3 } }
    if ((difficulty === 'easy' || difficulty === 'normal') && clues <= target) break
  }
  if (!best) throw new Error('Could not generate a Classic puzzle. Please try again.')
  return best
}
