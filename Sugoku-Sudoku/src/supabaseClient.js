import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (Boolean(supabaseUrl) !== Boolean(supabaseKey)) {
  throw new Error('Set both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable cloud accounts.')
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null
