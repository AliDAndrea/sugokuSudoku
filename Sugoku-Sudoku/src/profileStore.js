import { useSyncExternalStore } from 'react'
import user from './user.js'

let profile = { username: user.username, profileImage: user.profileImage }
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
  profile = { ...profile, ...updates }
  listeners.forEach((listener) => listener())
}
