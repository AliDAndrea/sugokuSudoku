import { regionAt } from './chaosSudoku.js'

// Work only from visible numbers and puzzle rules, never the saved solution or notes.
export function logicalHintTiles(board) {
  if (board.archived || board.completedAt || board.failedAt || board.livesUsed >= 5) return []
  const { size, cells } = board
  const units = []
  for (let n = 0; n < size; n++) {
    units.push(cells.map((_, i) => i).filter(i => Math.floor(i / size) === n))
    units.push(cells.map((_, i) => i).filter(i => i % size === n))
    units.push(cells.map((_, i) => i).filter(i => regionAt(board, i) === n))
  }
  const cages = board.cages || []
  const candidates = cells.map((cell, index) => {
    if (cell?.kind === 'number') return []
    const peers = new Set(units.filter(unit => unit.includes(index)).flat())
    const cage = cages.find(cage => cage.cells.includes(index))
    cage?.cells.forEach(i => peers.add(i))
    const used = new Set([...peers].filter(i => cells[i]?.kind === 'number').map(i => cells[i].number))
    return Array.from({ length: size }, (_, i) => i + 1).filter(number => {
      if (used.has(number)) return false
      if (!cage) return true
      const filled = cage.cells.filter(i => cells[i]?.kind === 'number')
      const remaining = cage.sum - filled.reduce((sum, i) => sum + cells[i].number, 0) - number
      const count = cage.cells.length - filled.length - 1
      const cageUsed = new Set(filled.map(i => cells[i].number))
      const available = Array.from({ length: size }, (_, i) => i + 1).filter(n => n !== number && !cageUsed.has(n))
      if (!count) return remaining === 0
      return available.length >= count && remaining >= available.slice(0, count).reduce((a, b) => a + b, 0) && remaining <= available.slice(-count).reduce((a, b) => a + b, 0)
    })
  })
  // Contradictory visible entries cannot provide a trustworthy hint.
  if (cells.some((cell, i) => cell?.kind !== 'number' && !candidates[i].length)) return []
  if ([...units, ...cages.map(cage => cage.cells)].some(unit => {
    const numbers = unit.filter(i => cells[i]?.kind === 'number').map(i => cells[i].number)
    return new Set(numbers).size !== numbers.length
  })) return []
  const targets = new Set()
  candidates.forEach((options, i) => { if (options.length === 1) targets.add(i) })
  for (const unit of units) {
    for (let number = 1; number <= size; number++) {
      const possible = unit.filter(i => candidates[i].includes(number))
      if (possible.length === 1) targets.add(possible[0])
    }
  }
  return [...targets]
}
