import { useSyncExternalStore } from 'react'
import { supabase } from './supabaseClient.js'

const emptyProfile = {
  username: '',
  profileImage: null,
  email: '',
  level: 1,
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

function profileFromRow(row) {
  return {
    username: row.username,
    profileImage: row.profile_image,
    email: row.email,
    level: row.level,
    dailyStreak: row.daily_streak,
    puzzlesCompleted: row.puzzles_completed,
    fastestTime: row.fastest_time,
    sudo: row.sudo,
    hints: row.hints,
    selectedPen: row.selected_pen,
    ownedPens: row.owned_pens,
    ownedPacks: row.owned_packs,
    authenticated: true,
    authUserId: row.id,
  }
}

async function loadCloudProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, email, profile_image, level, daily_streak, puzzles_completed, fastest_time, sudo, hints, selected_pen, owned_pens, owned_packs')
    .eq('id', userId)
    .single()
  if (error) throw error
  profile = profileFromRow(data)
  publish()
  return profile
}

export function useProfile() {
  return useSyncExternalStore(subscribe, () => profile)
}

export const isSupabaseEnabled = Boolean(supabase)

export async function refreshProfile() {
  if (!supabase) return profile
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  if (!data.user) {
    profile = { ...emptyProfile }
    publish()
    return profile
  }
  return loadCloudProfile(data.user.id)
}

if (supabase) {
  supabase.auth.onAuthStateChange((_event, session) => {
    queueMicrotask(() => {
      if (!session) {
        profile = { ...emptyProfile }
        publish()
      } else {
        loadCloudProfile(session.user.id).catch((error) => {
          console.error('Could not load the signed-in profile.', error)
        })
      }
    })
  })

  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Could not restore the Supabase session.', error)
      return
    }
    if (data.session) {
      return loadCloudProfile(data.session.user.id).catch((profileError) => {
        console.error('Could not load the signed-in profile.', profileError)
      })
    }
    profile = { ...emptyProfile }
    publish()
  })
}

if (!supabase && import.meta.env.DEV) {
  const initialRevision = profileRevision
  fetch('/api/profile')
    .then(async (response) => {
      const result = await response.json()
      if (!response.ok || !result.ok) throw new Error(result.error || 'Could not load the local profile.')
      if (profileRevision === initialRevision) {
        profile = { ...emptyProfile, ...result.profile }
        publish()
      }
    })
    .catch((error) => {
      console.error('Could not load the local profile.', error)
    })
}

export async function saveProfile(updates) {
  if (supabase) {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) throw authError
    if (!authData.user) throw new Error('Sign in to save profile changes.')

    if ('password' in updates || 'email' in updates) {
      const authUpdates = {}
      if ('password' in updates) authUpdates.password = updates.password
      if ('email' in updates) authUpdates.email = updates.email
      const { error } = await supabase.auth.updateUser(authUpdates)
      if (error) throw error
      if ('email' in updates && !('password' in updates)) return
    }

    const fieldNames = {
      username: 'username',
      profileImage: 'profile_image',
      selectedPen: 'selected_pen',
    }
    const patch = Object.fromEntries(
      Object.entries(updates)
        .filter(([field]) => field in fieldNames)
        .map(([field, value]) => [fieldNames[field], value]),
    )
    const unsupported = Object.keys(updates).filter((field) => (
      !(field in fieldNames) && field !== 'password' && field !== 'email'
    ))
    if (unsupported.length) throw new Error('This profile change is not allowed from the app.')
    if (Object.keys(patch).length) {
      const { error } = await supabase.from('profiles').update(patch).eq('id', authData.user.id)
      if (error) throw error
      await loadCloudProfile(authData.user.id)
    }
    return
  }

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
  publish()
}

export async function spendSudo(kind, itemId) {
  if (!supabase) throw new Error('Cloud purchases are not configured.')
  const { data, error } = await supabase.rpc('purchase_with_sudo', {
    p_kind: kind,
    p_item_id: itemId,
  })
  if (error) throw error
  await refreshProfile()
  return data
}

export async function waitForSudoBalance(targetBalance) {
  while (profile.sudo < targetBalance) {
    await refreshProfile()
    if (profile.sudo >= targetBalance) return true
    await new Promise((resolve) => setTimeout(resolve, 1500))
  }
  return true
}

export async function accessAccount(credentials) {
  if (supabase) {
    const { action, username, email, password } = credentials
    const result = action === 'signup'
      ? await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        })
      : await supabase.auth.signInWithPassword({ email, password })
    if (result.error) throw result.error
    if (!result.data.session) {
      throw new Error('Check your email to finish signing up, then sign in.')
    }
    await loadCloudProfile(result.data.user.id)
    return
  }

  const response = await fetch('/api/account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  const result = await response.json().catch(() => ({ error: 'Start the app with npm run dev to access accounts.' }))
  if (!response.ok || !result.ok) throw new Error(result.error || 'Could not access account.')
  profile = { ...result.profile, authenticated: true }
  publish()
}
