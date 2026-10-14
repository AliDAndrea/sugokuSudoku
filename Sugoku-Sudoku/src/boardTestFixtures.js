import { Board } from './boardState.js'

// Interaction tests need editable cells independent of puzzle generation.
export class EmptyBoard extends Board {
  constructor(options = {}) {
    const size = options.size === 6 || options.size === '6x6' ? 6 : 9
    super({ ...options, generatedPuzzle: { puzzle: Array(size * size).fill(0) } })
  }
}
