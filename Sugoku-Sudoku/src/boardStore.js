import { Board, MAX_BOARD_PLAYERS, pickUserColor } from './boardState.js'

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

export function inviteFriendToBoard(id, user, friend, friends, storage = globalThis.localStorage) {
  const board = getBoard(id, user, storage)
  if (!board) throw new Error('Board not found.')
  if (board.createdBy.username !== user.username) throw new Error('Only the board owner can invite friends.')
  if (board.archived || board.completedAt || board.failedAt || board.livesUsed >= 5) throw new Error('Only boards in progress can receive invitations.')
  if (!friends.some((entry) => entry.name === friend.name)) throw new Error('Choose someone from your friends list.')
  if ([board.createdBy, ...board.usersInvited].some((entry) => entry.username === friend.name)) return board
  if (new Set([board.createdBy, ...board.usersInvited].map((participant) => participant.username)).size >= MAX_BOARD_PLAYERS) throw new Error('This board already has the maximum of 9 participants.')
  const friendBoards = listBoards({ username: friend.name }, storage).filter((entry) => !entry.archived && entry.createdBy.username !== friend.name)
  if (friendBoards.length >= 10) throw new Error(`${friend.name}'s Friends' Puzzles section is full (10/10).`)
  const participant = { username: friend.name, profileImage: friend.profileImage || null }
  return saveBoard({ ...board, usersInvited: [...board.usersInvited, participant], colors: [...board.colors, { user: participant, color: pickUserColor(board.colors) }] }, storage)
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
  if (board.failedAt || board.livesUsed >= 5) throw new Error('Failed boards cannot be archived.')
  if (board.archived) return board
  if (!board.completedAt) throw new Error('Finish the board before archiving it.')
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
