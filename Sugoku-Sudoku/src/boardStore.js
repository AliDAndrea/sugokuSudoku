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
    .reverse()
    .sort((a, b) => (b.lastOpenedAt || b.createdAt || 0) - (a.lastOpenedAt || a.createdAt || 0))
}

export function openBoard(board, user, storage = globalThis.localStorage) {
  const opened = saveBoard({ ...board, lastOpenedAt: Date.now() }, storage)
  storage.setItem(`sugoku-active-board:${user.username}`, board.id)
  return opened
}

export function boardName(board) {
  const title = (value) => value.charAt(0).toUpperCase() + value.slice(1)
  return `${title(board.difficulty)} ${title(board.type)} ${board.size}x${board.size}`
}
