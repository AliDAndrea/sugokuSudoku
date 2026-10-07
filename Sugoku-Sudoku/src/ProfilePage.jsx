import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as images from './figmages/index.js'
import user from './user.js'
import { saveProfile, useProfile } from './profileStore.js'

const pageStyle = {
  backgroundColor: '#fff',
  color: '#000',
  fontFamily: 'var(--font-piedra)',
  width: '100%',
  maxWidth: '404px',
  minHeight: '1009px',
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  margin: '0 auto',
  textAlign: 'left',
}

const backgroundStyle = {
  width: '1452px',
  height: '1009px',
  position: 'absolute',
  left: '-629px',
  top: '-68px',
  maxWidth: 'none',
  zIndex: -1,
}

function ProfileDetails({ view }) {
  const profile = useProfile()
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const imageInput = useRef(null)
  const persist = async (updates) => {
    setSaving(true)
    setStatus('Saving…')
    try {
      await saveProfile(updates)
      setStatus('')
    } catch (error) {
      setStatus(error.message)
    } finally {
      setSaving(false)
    }
  }
  const chooseImage = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type)) {
      setStatus('Choose a PNG, JPEG, WebP, or GIF image.')
      return
    }
    if (file.size > 3 * 1024 * 1024) { setStatus('Please choose an image smaller than 3 MB.'); return }
    try {
      const profileImage = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(new Error('Could not read image.'))
        reader.readAsDataURL(file)
      })
      await persist({ profileImage })
    } catch (error) { setStatus(error.message) }
  }
  const active = view === 'profile'
  const position = {
    left: active ? '4px' : '3px',
    top: '51px',
  }

  return (
    <div className="profile-panel" style={{ ...position, width: '396px', height: '549px', position: 'absolute', zIndex: 0 }}>
      <img src={images.Profile} style={{ width: '396px', height: '549px', position: 'absolute', left: 0, top: 0, maxWidth: 'none' }} alt="Profile" />
      <BackToHome left="9px" top="10px" active={active} />
      <div className="profile-panel-content" data-active={active} aria-hidden={!active} inert={!active}>
          <ProfileField label="Username:" value={profile.username} top="108px" />
          <ProfileField label="Level: " value={user.level} top="167px" labelWidth="74px" />
          <ProfileField label="Daily Streak: " value={user.dailyStreak} top="224px" labelWidth="162px" />
          <ProfileField label="Puzzles Complete: " value={user.puzzlesCompleted} top="282px" labelWidth="227px" />
          <ProfileField
            label="Fastest Time:" 
            value={user.fastestTime}
            top="339px"
            labelWidth="166px"
          />
          <p role="status" style={{ position: 'absolute', left: '125px', top: '417px', width: '235px', fontSize: '12px', lineHeight: 1.2 }}>{status}</p>
      </div>
      {active && <>
          <input ref={imageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={chooseImage} hidden />
          <button type="button" aria-label="Choose profile picture" title="Choose profile picture" disabled={saving} onClick={() => imageInput.current.click()} style={{ position: 'absolute', left: '31px', top: '391px', width: '80px', height: '80px', padding: 0, border: '1px solid #171614', borderRadius: '50%', background: '#d9dddd', overflow: 'hidden', cursor: 'pointer' }}>
            {profile.profileImage && <img src={profile.profileImage} alt="Your profile" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />}
          </button>
      </>}
      {!active && (
        <Link to="/profile" aria-label="Open profile" style={{ position: 'absolute', inset: 0, display: 'block' }} />
      )}
    </div>
  )
}

function ProfileField({ label, value, top, valueFontSize = '22px' }) {
  return (
    <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '28px', lineHeight: '42px', width: '334px', height: '42px', position: 'absolute', left: '31px', top, display: 'flex', alignItems: 'baseline', gap: '12px', whiteSpace: 'nowrap' }}>
      <span>{label.trim()}</span>
      <span style={{ fontSize: valueFontSize }}>{value}</span>
    </p>
  )
}

function ReplacementNotebook({ src, alt }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '232.512%', height: '116.312%', position: 'absolute', left: '-67.488%', top: '-12.057%', maxWidth: 'none' }}
      />
    </div>
  )
}

function ChangePasswordPanel({ view }) {
  const active = view === 'change-password'
  const position = {
    left: '-2px',
    top: active ? '188px' : view === 'change-email' ? '191px' : '525px',
  }

  return (
    <div className="profile-panel" style={{ ...position, width: '100%', height: '562px', position: 'absolute', zIndex: 1 }}>
      <ReplacementNotebook src={images.PasswordPage} alt="Change password" />
      <BackToHome left="12px" top="11px" active={active} />
      {active && <img
            src={images.ConfirmButton}
            style={{ width: '180px', height: '60px', position: 'absolute', left: '140px', top: '297px', maxWidth: 'none' }}
            alt="Confirm"
          />}
      <div className="profile-panel-content" data-active={active} aria-hidden={!active} inert={!active}>
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '154px', height: '33px', position: 'absolute', left: '28px', top: '168px', whiteSpace: 'nowrap' }}>
            New Password:
          </p>
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '239px', height: '33px', position: 'absolute', left: '28px', top: '227px', whiteSpace: 'nowrap' }}>
            Confirm New Password:
          </p>
      </div>
      {!active && (
        <Link to="/profile/change-password" aria-label="Change password" style={{ position: 'absolute', inset: 0, display: 'block' }} />
      )}
    </div>
  )
}

function ChangeEmailPanel({ view }) {
  const active = view === 'change-email'
  const position = {
    left: view === 'profile' ? '-4px' : '-5px',
    top: active ? '361px' : view === 'change-password' ? '686px' : '690px',
  }

  return (
    <div className="profile-panel" style={{ ...position, width: '413px', height: '573px', position: 'absolute', zIndex: 2 }}>
      <ReplacementNotebook src={images.PersonalInfoPage} alt="Change email" />
      <BackToHome left="15px" top="12px" active={active} />
      {active && <img
            src={images.ConfirmButton}
            style={{ width: '180px', height: '60px', position: 'absolute', left: '145px', top: '262px', maxWidth: 'none' }}
            alt="Confirm"
          />}
      <div className="profile-panel-content" data-active={active} aria-hidden={!active} inert={!active}>
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '112px', height: '33px', position: 'absolute', left: '25px', top: '111px', whiteSpace: 'nowrap' }}>
            New Email:
          </p>
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '187px', height: '33px', position: 'absolute', left: '25px', top: '171px', whiteSpace: 'nowrap' }}>
            Confirmation Code:
          </p>
      </div>
      {!active && (
        <Link to="/profile/change-email" aria-label="Change email" style={{ position: 'absolute', inset: 0, display: 'block' }} />
      )}
    </div>
  )
}

function BackToHome({ left, top, active }) {
  return (
    <Link
      to="/"
      aria-label="Return to home page"
      className="profile-arrow"
      aria-hidden={!active}
      tabIndex={active ? 0 : -1}
      style={{ width: '51px', height: '63px', position: 'absolute', left, top, display: 'block', zIndex: 10, opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none' }}
    >
      <img src={images.Arrowleft} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="" />
    </Link>
  )
}

export default function ProfilePage() {
  const { pathname } = useLocation()
  const view = pathname.endsWith('/change-password')
    ? 'change-password'
    : pathname.endsWith('/change-email')
      ? 'change-email'
      : 'profile'

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [view])

  return (
    <div className="profile-page-transition" style={pageStyle}>
      <img src={images.BgSettings} style={backgroundStyle} alt="" />

      <ProfileDetails view={view} />
      <ChangePasswordPanel view={view} />
      <ChangeEmailPanel view={view} />

    </div>
  )
}

