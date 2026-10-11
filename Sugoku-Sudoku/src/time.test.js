import test from 'node:test'
import assert from 'node:assert/strict'
import { formatTime } from './time.js'

test('time displays minutes and seconds, adding hours only when nonzero', () => {
  assert.equal(formatTime(0), '00:00')
  assert.equal(formatTime(65000), '01:05')
  assert.equal(formatTime(3599000), '59:59')
  assert.equal(formatTime(3600000), '01:00:00')
  assert.equal(formatTime(3661000), '01:01:01')
})
