import test from 'node:test'
import assert from 'node:assert/strict'
import { applyLevelUps, requiredXp } from './xp.js'

test('level-ups require the exact threshold and carry over excess XP', () => {
  assert.deepEqual(applyLevelUps(1, 99), { level: 1, totalXp: 99 })
  assert.deepEqual(applyLevelUps(1, 100), { level: 2, totalXp: 0 })
  assert.deepEqual(applyLevelUps(1, 125), { level: 2, totalXp: 25 })
})

test('one award can advance multiple levels using each level requirement', () => {
  const xp = requiredXp(4) + requiredXp(5) + requiredXp(6) + 17
  assert.deepEqual(applyLevelUps(4, xp), { level: 7, totalXp: 17 })
  assert.deepEqual(applyLevelUps(1, 1000), { level: 7, totalXp: 9 })
})
