import { regionAt } from './chaosSudoku.js'

export function completionFlashes(board, cells, selected, wholeBoard = false) {
  const { size } = board
  const row = Math.floor(selected / size)
  const column = selected % size
  const indices = cells.map((_, index) => index)
  const groups = wholeBoard ? [indices] : [
    indices.filter((index) => Math.floor(index / size) === row),
    indices.filter((index) => index % size === column),
    ...(board.type === 'chaos' ? [] : [indices.filter((index) => regionAt(board, index) === regionAt(board, selected))]),
  ].filter((group) => group.every((index) => cells[index]?.kind === 'number'))
  const affected = [...new Set(groups.flat())]
  const distance = (index) => Math.max(Math.abs(Math.floor(index / size) - row), Math.abs(index % size - column))
  const distances = [...new Set(affected.map(distance))].sort((a, b) => a - b)
  return affected.map((index) => ({ index, delay: distances.indexOf(distance(index)) * 50 }))
}
