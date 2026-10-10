export const userColors = [
  '#FF294D', '#FFB84C', '#E7FF34', '#0A6D32', '#00FFB2',
  '#00B8E6', '#174FC4', '#9234FF', '#FF70C4',
]

function randomIndex(length) {
  const sample = new Uint32Array(1)
  const limit = Math.floor(0x100000000 / length) * length
  do { globalThis.crypto.getRandomValues(sample) } while (sample[0] >= limit)
  return sample[0] % length
}

export function pickUserColor(assignments, chooseIndex = randomIndex) {
  const used = new Set(assignments.map((assignment) => assignment.color))
  const available = userColors.filter((color) => !used.has(color))
  if (available.length) return available[chooseIndex(available.length)]
  let color
  do { color = `#${chooseIndex(0x1000000).toString(16).padStart(6, '0').toUpperCase()}` } while (used.has(color))
  return color
}


export class Board {
  constructor({ size = 9, difficulty = 'easy', type = 'classic', user = { username: 'Guest' }, usersInvited = [] } = {}) {
    this.id = globalThis.crypto.randomUUID()
    this.createdAt = Date.now()
    this.lastOpenedAt = null
    this.size = size === 6 || size === '6x6' ? 6 : 9
    this.difficulty = difficulty
    this.type = type
    this.cells = Array(this.size * this.size).fill(null)
    this.hintsUsed = 0
    this.livesUsed = 0
    this.createdBy = { ...user }
    this.usersInvited = usersInvited.map((participant) => ({ ...participant }))
    const participants = [user, ...usersInvited].filter((participant, index, all) => all.findIndex((entry) => entry.username === participant.username) === index)
    this.colors = []
    for (const participant of participants) {
      this.colors.push({ user: { ...participant }, color: pickUserColor(this.colors) })
    }
  }
}

export function createBoardState(board = new Board()) {
  return { board, selected: null, noteMode: false }
}

export function isRelatedCell(index, selected, size = 9) {
  return selected !== null && index !== selected && (
    Math.floor(index / size) === Math.floor(selected / size) || index % size === selected % size
  )
}

export function boardReducer(state, action) {
  switch (action.type) {
    case 'select':
      return { ...state, selected: state.selected === action.index ? null : action.index }
    case 'deselect':
      return state.selected === null ? state : { ...state, selected: null }
    case 'toggle-notes':
      return { ...state, noteMode: !state.noteMode }
    case 'enter': {
      if (state.selected === null || !Number.isInteger(action.number) || action.number < 1 || action.number > state.board.size) return state
      const cell = state.board.cells[state.selected]
      if (cell?.kind === 'number') return state
      const colors = [...state.board.colors]
      let assignment = colors.find((entry) => entry.user.username === action.user.username)
      if (!assignment) {
        assignment = { user: { ...action.user }, color: pickUserColor(colors) }
        colors.push(assignment)
      }
      const number = { kind: 'number', number: action.number, user: { ...action.user }, pen: { ...action.pen }, color: assignment.color }
      const cells = [...state.board.cells]
      if (state.noteMode) {
        const notes = cell?.numbers || []
        const existing = notes.some((note) => note.number === action.number)
        const numbers = existing ? notes.filter((note) => note.number !== action.number) : [...notes, number].sort((a, b) => a.number - b.number)
        cells[state.selected] = numbers.length ? { kind: 'note', numbers } : null
      } else cells[state.selected] = number
      return { ...state, board: { ...state.board, cells, colors } }
    }
    default:
      return state
  }
}
