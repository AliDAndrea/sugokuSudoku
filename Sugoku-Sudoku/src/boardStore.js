import { Board } from './boardState.js'

const storageKey = 'sugoku-boards-v1'

export function saveBoard(board, storage = globalThis.localStorage) {
  const saved = JSON.parse(storage.getItem(storageKey) || '{}')
  saved[board.id] = board
  storage.setItem(storageKey, JSON.stringify(saved))
  storage.setItem(`sugoku-active-board:${board.createdBy.username}`, board.id)
  return board
}

export function createSavedBoard(options, storage = globalThis.localStorage) {
  return saveBoard(new Board(options), storage)
}

export function loadBoard(user, storage = globalThis.localStorage) {
  const saved = JSON.parse(storage.getItem(storageKey) || '{}')
  const id = storage.getItem(`sugoku-active-board:${user.username}`)
  return openBoard(saved[id] || createSavedBoard({ user }, storage), user, storage)
}


export function listBoards(user, storage = globalThis.localStorage) {
  return Object.values(JSON.parse(storage.getItem(storageKey) || '{}'))
    .filter((board) => board.createdBy.username === user.username || board.usersInvited.some((participant) => participant.username === user.username))
    .filter((board) => board.archived || (!board.completedAt && !board.failedAt && board.livesUsed < 5))
    .reverse()
    .sort((a, b) => (b.lastOpenedAt || b.createdAt || 0) - (a.lastOpenedAt || a.createdAt || 0))
}

export function openBoard(board, user, storage = globalThis.localStorage) {
  const opened = saveBoard({ ...board, createdAt: board.createdAt || board.lastOpenedAt || Date.now(), lastOpenedAt: Date.now() }, storage)
  storage.setItem(`sugoku-active-board:${user.username}`, board.id)
  return opened
}

export function boardName(board) {
  const title = (value) => value.charAt(0).toUpperCase() + value.slice(1)
  return `${title(board.difficulty)} ${title(board.type)} ${board.size}x${board.size}`
}


export function getBoard(id, user, storage = globalThis.localStorage) {
  const board = JSON.parse(storage.getItem(storageKey) || '{}')[id]
  return board && (board.createdBy.username === user.username || board.usersInvited.some((participant) => participant.username === user.username)) ? board : null
}


export function archiveBoard(id, user, storage = globalThis.localStorage) {
  const board = getBoard(id, user, storage)
  if (!board) throw new Error('Board not found.')
  if (board.archived) return board
  if (!board.completedAt && !board.failedAt && board.livesUsed < 5) throw new Error('Finish the board before archiving it.')
  if (listBoards(user, storage).filter((entry) => entry.archived).length >= 5) throw new Error('Your archive is full.')
  return saveBoard({ ...board, archived: true }, storage)
}

export function deleteBoard(id, user, storage = globalThis.localStorage) {
  const board = getBoard(id, user, storage)
  if (!board) throw new Error('Board not found.')
  const saved = JSON.parse(storage.getItem(storageKey) || '{}')
  delete saved[id]
  storage.setItem(storageKey, JSON.stringify(saved))
  for (const participant of [board.createdBy, user, ...board.usersInvited]) {
    const key = `sugoku-active-board:${participant.username}`
    if (storage.getItem(key) === id) storage.removeItem(key)
  }
}

export function discardFinishedBoard(id, user, storage = globalThis.localStorage) {
  const board = getBoard(id, user, storage)
  if (board && !board.archived && (board.completedAt || board.failedAt || board.livesUsed >= 5)) {
    deleteBoard(id, user, storage)
  }
}
