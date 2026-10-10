import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as images from './figmages/index.js'
import './AuthPage.css'
import { accessAccount, isSupabaseEnabled } from './profileStore.js'

function AuthField({ label, ...props }) {
  return <label className="auth-field">
    {label}
    <span className="profile-input-frame"><input {...props} className="profile-input" required /></span>
  </label>
}

function AuthNotebook({ signup, active }) {
  const [status, setStatus] = useState('')
  const submitting = useRef(false)
  const navigate = useNavigate()
  const title = signup ? 'Sign Up' : 'Sign In'
  const submit = async (event) => {
    event.preventDefault()
    if (submitting.current) return
    const data = new FormData(event.currentTarget)
    const username = String(data.get('username') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    if ((signup && !username) || (!signup && !isSupabaseEnabled && !username)) {
      setStatus('Enter a username.')
      return
    }
    if (isSupabaseEnabled && !email) {
      setStatus('Enter your email address.')
      return
    }
    if (!data.get('password') || (signup && !data.get('confirmation'))) {
      setStatus(signup ? 'Enter and confirm your password.' : 'Enter your password.')
      return
    }
    if (signup && data.get('password') !== data.get('confirmation')) {
      setStatus('Passwords must match.')
      return
    }
    submitting.current = true
    setStatus('')
    try {
      await accessAccount({ action: signup ? 'signup' : 'signin', username, email, password: data.get('password') })
      navigate('/', { replace: true })
    } catch (error) { setStatus(error.message) }
    finally { submitting.current = false }
  }
  return <section className={`auth-notebook profile-panel ${signup ? 'auth-signup' : 'auth-signin'}`} data-active={active} aria-label={title}>
    <div className="auth-paper"><img src={images.BlankPage} alt="" /></div>
    <h1 className="auth-title">{title}</h1>
    <div className="profile-panel-content auth-content" data-active={active} aria-hidden={!active} inert={!active}>
      <form noValidate onSubmit={submit} onChange={() => setStatus('')} className="auth-form">
        {(signup || !isSupabaseEnabled) && <AuthField label="Username:" name="username" type="text" autoComplete="username" maxLength={30} pattern={'.*\\S.*'} />}
        {isSupabaseEnabled && <AuthField label="Email:" name="email" type="email" autoComplete="email" maxLength={254} />}
        <AuthField label="Password:" name="password" type="password" autoComplete={signup ? 'new-password' : 'current-password'} minLength={1} />
        {signup && <AuthField label="Confirm Password:" name="confirmation" type="password" autoComplete="new-password" minLength={1} />}
        <div className="auth-actions">
          <p role="alert" className="auth-status">{status}</p>
          <button type="submit" className="auth-confirm" aria-label={title}><img src={images.ConfirmButton} alt="Confirm" /></button>
        </div>
      </form>
    </div>
    {!active && <Link className="auth-open" to={signup ? '/sign-up' : '/sign-in'} aria-label={`Open ${title.toLowerCase()}`} />}
  </section>
}

export default function AuthPage() {
  const { pathname } = useLocation()
  const signup = pathname === '/sign-up'
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [signup])
  return <main className="auth-page">
    <img className="auth-background" src={images.BgSettings} alt="" />
    <AuthNotebook signup={false} active={!signup} />
    <AuthNotebook signup active={signup} />
  </main>
}
