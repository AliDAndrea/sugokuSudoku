import { useSyncExternalStore } from 'react'

const emptyProfile = {
  username: '',
  profileImage: null,
  email: '',
  level: 1,
  totalXp: 0,
  dailyStreak: 0,
  puzzlesCompleted: 0,
  fastestTime: 0,
  sudo: 0,
  hints: 0,
  selectedPen: 'Pencil Pen',
  ownedPens: ['Pencil Pen'],
  ownedPacks: ['pack-E_1'],
  authenticated: false,
  authUserId: null,
}

let profile = { ...emptyProfile }
const listeners = new Set()
let profileRevision = 0
const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
const publish = () => {
  profileRevision += 1
  listeners.forEach((listener) => listener())
}

export function useProfile() {
  return useSyncExternalStore(subscribe, () => profile)
}

async function readLocalProfile() {
  const response = await fetch('/api/profile')
  const result = await response.json()
  if (!response.ok || !result.ok) throw new Error(result.error || 'Could not load the local profile.')
  return { ...emptyProfile, ...result.profile, authenticated: Boolean(result.profile.username) }
}

export async function refreshProfile() {
  profile = await readLocalProfile()
  publish()
  return profile
}

if (import.meta.env.DEV) {
  const initialRevision = profileRevision
  readLocalProfile()
    .then((localProfile) => {
      if (profileRevision === initialRevision) {
        profile = localProfile
        publish()
      }
    })
    .catch((error) => {
      console.error('Could not load the local profile.', error)
    })
}

export async function saveProfile(updates) {
  const response = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  const result = await response.json().catch(() => ({ error: 'Start the app with npm run dev to save your local profile.' }))
  if (!response.ok || !result.ok) throw new Error(result.error || 'Could not save profile.')
  const { password: _password, ...publicUpdates } = updates
  void _password
  profile = { ...profile, ...publicUpdates, ...result.profile }
  publish()
}

export async function accessAccount(credentials) {
  const response = await fetch('/api/account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  const result = await response.json().catch(() => ({ error: 'Start the app with npm run dev to access accounts.' }))
  if (!response.ok || !result.ok) throw new Error(result.error || 'Could not access account.')
  profile = { ...emptyProfile, ...result.profile, authenticated: true }
  publish()
}
