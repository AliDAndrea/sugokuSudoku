import test from 'node:test'
import assert from 'node:assert/strict'
import { createSavedBoard, inviteFriendToBoard, listBoards, saveBoard } from './boardStore.js'
import { boardReducer, createBoardState } from './boardState.js'

const user = { username: 'Owner' }
const friend = { id: 'friend', name: 'Friend' }
const makeStorage = () => {
  const values = new Map()
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
}

test('invitation shares the board, adds one participant and locks their unique color', () => {
  const storage = makeStorage()
  const board = createSavedBoard({ user, type: 'chaos' }, storage)
  const invited = inviteFriendToBoard(board.id, user, friend, [friend], storage)
  assert.equal(invited.usersInvited[0].username, friend.name)
  assert.equal(listBoards({ username: friend.name }, storage)[0].id, board.id)
  const before = storage.getItem('sugoku-boards-v1')
  const anotherFriend = { id: 'another', name: 'Another' }
  assert.throws(() => inviteFriendToBoard(board.id, { username: friend.name }, anotherFriend, [anotherFriend], storage), /Only the board owner/)
  assert.equal(storage.getItem('sugoku-boards-v1'), before)
  assert.equal(new Set(invited.colors.map((entry) => entry.color)).size, 2)
  assert.equal(inviteFriendToBoard(board.id, user, friend, [friend], storage).usersInvited.length, 1)
  const state = createBoardState(invited)
  assert.equal(boardReducer(state, { type: 'change-color', user, color: invited.colors[1].color }), state)
  const friendState = boardReducer(state, { type: 'change-color', user: { username: friend.name }, color: invited.colors[0].color })
  assert.equal(friendState, state)
})

test('capacity counts active friend boards and a failed invitation changes nothing', () => {
  const storage = makeStorage()
  const invitedBoards = Array.from({ length: 10 }, () => createSavedBoard({ user, type: 'chaos', usersInvited: [{ username: friend.name }] }, storage))
  createSavedBoard({ user: { username: friend.name }, type: 'chaos' }, storage)
  const board = createSavedBoard({ user, type: 'chaos' }, storage)
  const before = storage.getItem('sugoku-boards-v1')
  assert.throws(() => inviteFriendToBoard(board.id, user, friend, [friend], storage), /full \(10\/10\)/)
  assert.equal(storage.getItem('sugoku-boards-v1'), before)
  saveBoard({ ...invitedBoards[0], failedAt: Date.now() }, storage)
  assert.equal(inviteFriendToBoard(board.id, user, friend, [friend], storage).usersInvited.length, 1)
})

test('invitations reject nonfriends, finished boards and boards with nine participants', () => {
  const storage = makeStorage()
  const board = createSavedBoard({ user, type: 'chaos' }, storage)
  assert.throws(() => inviteFriendToBoard(board.id, user, friend, [], storage), /friends list/)
  saveBoard({ ...board, completedAt: Date.now() }, storage)
  assert.throws(() => inviteFriendToBoard(board.id, user, friend, [friend], storage), /in progress/)
  const full = createSavedBoard({ user, type: 'chaos', usersInvited: Array.from({ length: 8 }, (_, index) => ({ username: `Player${index}` })) }, storage)
  assert.throws(() => inviteFriendToBoard(full.id, user, friend, [friend], storage), /9 participants/)
})

test('creation and invitations enforce nine players including the owner', () => {
  const storage = makeStorage()
  const players = Array.from({ length: 7 }, (_, index) => ({ username: `Player${index}` }))
  const board = createSavedBoard({ user, type: 'chaos', usersInvited: players }, storage)
  const ninth = inviteFriendToBoard(board.id, user, friend, [friend], storage)
  assert.equal(ninth.usersInvited.length, 8)
  assert.equal(ninth.colors.length, 9)
  assert.equal(new Set(ninth.colors.map((entry) => entry.color)).size, 9)
  const tenth = { id: 'tenth', name: 'Tenth' }
  assert.throws(() => inviteFriendToBoard(board.id, user, tenth, [tenth], storage), /9 participants/)
  assert.throws(() => createSavedBoard({ user, type: 'chaos', usersInvited: [...players, { username: 'Ninth' }, { username: 'Tenth' }] }, storage), /at most 9 players/)
})
