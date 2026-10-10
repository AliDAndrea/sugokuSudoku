import { useSyncExternalStore } from 'react'
import user from './user.js'

let profile = {
  username: user.username,
  profileImage: user.profileImage,
  email: user.email,
  level: Number.isFinite(user.level) ? user.level : 1,
  sudo: Number.isFinite(user.sudo) ? user.sudo : 0,
  hints: Number.isFinite(user.hints) ? user.hints : 0,
  selectedPen: user.selectedPen || 'Pencil Pen',
  ownedPens: user.ownedPens || [...new Set(['Pencil Pen', user.selectedPen || 'Pencil Pen'])],
  ownedPacks: user.ownedPacks || ['pack-E_1'],
}
const listeners = new Set()
const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useProfile() {
  return useSyncExternalStore(subscribe, () => profile)
}

export async function saveProfile(updates) {
  const response = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  const result = await response.json().catch(() => ({ error: 'Start the app with npm run dev to save to user.js.' }))
  if (!response.ok || !result.ok) throw new Error(result.error || 'Could not save profile.')
  const { password: _password, ...publicUpdates } = updates
  void _password
  profile = { ...profile, ...publicUpdates }
  listeners.forEach((listener) => listener())
}

export async function accessAccount(credentials) {
  const response = await fetch('/api/account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  const result = await response.json().catch(() => ({ error: 'Start the app with npm run dev to access accounts.' }))
  if (!response.ok || !result.ok) throw new Error(result.error || 'Could not access account.')
  profile = result.profile
  listeners.forEach((listener) => listener())
}
