import { useSyncExternalStore } from 'react'
import user from './user.js'

let profile = { username: user.username, profileImage: user.profileImage, email: user.email }
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
