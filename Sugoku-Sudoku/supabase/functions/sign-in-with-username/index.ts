import { createClient } from 'npm:@supabase/supabase-js@2'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
}
const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers })

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { headers })
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed.' })
  try {
    const { action = 'signin', username, password } = await request.json()
    if (action !== 'signin' && action !== 'signup') return json(400, { error: 'Invalid account action.' })
    if (typeof username !== 'string' || !username.trim() || username.trim().length > 30 ||
        typeof password !== 'string' || !password) {
      return json(400, { error: 'Enter your username and password.' })
    }
    const url = Deno.env.get('SUPABASE_URL')!
    const options = { auth: { persistSession: false, autoRefreshToken: false } }
    const admin = createClient(url, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, options)
    const auth = createClient(url, Deno.env.get('SUPABASE_ANON_KEY')!, options)
    if (action === 'signup') {
      if (password.length < 8) return json(400, { error: 'Use a password with at least 8 characters.' })
      // Supabase requires an email identifier internally; players never provide one.
      const email = `${crypto.randomUUID()}@accounts.sugoku.invalid`
      const { data: created, error: createError } = await admin.auth.admin.createUser({
        email, password, email_confirm: true, user_metadata: { username: username.trim() },
      })
      if (createError || !created.user) return json(400, { error: 'Could not create account. Try another username or a stronger password.' })
      const { data, error: loginError } = await auth.auth.signInWithPassword({ email, password })
      if (loginError || !data.session) return json(400, { error: 'Account created. Please sign in with your username and password.' })
      return json(200, { session: {
        access_token: data.session.access_token, refresh_token: data.session.refresh_token,
      } })
    }
    // Escape LIKE metacharacters so usernames containing them are matched literally.
    const name = username.trim().replace(/[\\%_]/g, '\\$&')
    const { data: profile, error } = await admin.from('profiles')
      .select('id').ilike('username', name).maybeSingle()
    if (error) return json(503, { error: 'Sign-in is temporarily unavailable.' })
    const { data: account } = profile
      ? await admin.auth.admin.getUserById(profile.id)
      : { data: null }
    // Always check a password through Auth, including for unknown usernames.
    const { data, error: authError } = await auth.auth.signInWithPassword({
      email: account?.user?.email || 'unknown-user@invalid.example', password,
    })
    if (!profile || authError || !data.session) {
      return json(401, { error: 'Invalid username or password.' })
    }
    return json(200, { session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    } })
  } catch {
    return json(400, { error: 'Could not sign in.' })
  }
})
