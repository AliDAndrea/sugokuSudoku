import { regionAt } from './chaosSudoku.js'
import { logicalHintTiles } from './boardHints.js'

// A contradiction proof covers deductions of any depth without consulting the
// saved answer. A tile qualifies only if no legal completion can change it.
export function advancedHintTiles(board) {
  const occupied = new Set((board.activeHints || []).filter(hint => board.cells[hint.index]?.kind !== 'number').map(hint => hint.index))
  const basic = logicalHintTiles(board).filter(index => !occupied.has(index))
  if (basic.length || board.archived || board.completedAt || board.failedAt || board.livesUsed >= 5) return basic
  const { size, cells } = board
  const full = (1 << size) - 1
  const values = cells.map(cell => cell?.kind === 'number' ? cell.number : 0)
  const regions = values.map((_, i) => regionAt(board, i))
  const cages = board.cages || []
  const peers = values.map((_, i) => values.map((_, j) => j).filter(j => j !== i && (
    Math.floor(i / size) === Math.floor(j / size) || i % size === j % size || regions[i] === regions[j]
    || cages.some(cage => cage.cells.includes(i) && cage.cells.includes(j))
  )))
  if (values.some((value, i) => value && (!Number.isInteger(value) || value < 1 || value > size || peers[i].some(j => values[j] === value)))) return []

  const allowed = index => {
    let mask = full
    for (const peer of peers[index]) if (values[peer]) mask &= ~(1 << (values[peer] - 1))
    for (const cage of cages.filter(cage => cage.cells.includes(index))) {
      let sum = 0, used = 0, empty = 0
      for (const i of cage.cells) {
        if (values[i]) { sum += values[i]; used |= 1 << (values[i] - 1) }
        else empty++
      }
      for (let number = 1; number <= size; number++) {
        const bit = 1 << (number - 1)
        if (!(mask & bit)) continue
        const available = Array.from({ length: size }, (_, i) => i + 1).filter(n => n !== number && !(used & (1 << (n - 1))))
        const count = empty - 1, remaining = cage.sum - sum - number
        if ((!count && remaining !== 0) || (count > 0 && (available.length < count || remaining < available.slice(0, count).reduce((a, b) => a + b, 0) || remaining > available.slice(-count).reduce((a, b) => a + b, 0)))) mask &= ~bit
      }
    }
    return mask
  }
  const validCages = () => cages.every(cage => {
    const sum = cage.cells.reduce((total, i) => total + values[i], 0)
    return cage.cells.some(i => !values[i]) ? sum < cage.sum : sum === cage.sum
  })
  const search = (differentIndex = -1, differentValue = 0) => {
    let selected = -1, options = 0, smallest = size + 1
    for (let i = 0; i < values.length; i++) {
      if (values[i]) continue
      let mask = allowed(i)
      if (i === differentIndex) mask &= ~(1 << (differentValue - 1))
      if (!mask) return null
      const count = mask.toString(2).replaceAll('0', '').length
      if (count < smallest) { selected = i; options = mask; smallest = count }
    }
    if (selected < 0) return validCages() ? [...values] : null
    for (let n = 1; n <= size; n++) {
      if (!(options & (1 << (n - 1)))) continue
      values[selected] = n
      const result = search(differentIndex, differentValue)
      values[selected] = 0
      if (result) return result
    }
    return null
  }
  if (!validCages()) return []
  const completion = search()
  if (!completion) return []
  return values.flatMap((number, index) => !number && !occupied.has(index) && !search(index, completion[index]) ? [index] : [])
}
