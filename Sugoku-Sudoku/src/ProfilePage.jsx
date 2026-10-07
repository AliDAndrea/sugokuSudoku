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
    <div className="profile-panel" style={{ ...position, width: '396px', height: '549px', position: 'absolute' }}>
      {active ? (
        <>
          <img
            src={images.Profile}
            style={{ width: '396px', height: '549px', position: 'absolute', left: 0, top: 0, maxWidth: 'none' }}
            alt="Profile"
          />
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
          <input ref={imageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={chooseImage} hidden />
          <button type="button" aria-label="Choose profile picture" title="Choose profile picture" disabled={saving} onClick={() => imageInput.current.click()} style={{ position: 'absolute', left: '31px', top: '391px', width: '80px', height: '80px', padding: 0, border: '1px solid #171614', borderRadius: '50%', background: '#d9dddd', overflow: 'hidden', cursor: 'pointer' }}>
            {profile.profileImage && <img src={profile.profileImage} alt="Your profile" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />}
          </button>
          <p role="status" style={{ position: 'absolute', left: '125px', top: '417px', width: '235px', fontSize: '12px', lineHeight: 1.2 }}>{status}</p>
        </>
      ) : (
        <Link to="/profile" aria-label="Open profile" style={{ width: '100%', height: '100%', display: 'block' }}>
          <img src={images.Profile} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="Profile" />
        </Link>
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

function ChangePasswordPanel({ view }) {
  const active = view === 'change-password'
  const position = {
    left: '-2px',
    top: active ? '188px' : view === 'change-email' ? '191px' : '525px',
  }

  return (
    <div className="profile-panel" style={{ ...position, width: '100%', height: '562px', position: 'absolute', zIndex: 1 }}>
      {active ? (
        <>
          <img
            src={images.ChangePassword}
            style={{ width: '100%', height: '562px', position: 'absolute', left: 0, top: 0, maxWidth: 'none' }}
            alt="Change password form"
          />
          <img
            src={images.ConfirmButton}
            style={{ width: '180px', height: '60px', position: 'absolute', left: '140px', top: '297px', maxWidth: 'none' }}
            alt="Confirm"
          />
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '154px', height: '33px', position: 'absolute', left: '28px', top: '168px', whiteSpace: 'nowrap' }}>
            New Password:
          </p>
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '239px', height: '33px', position: 'absolute', left: '28px', top: '227px', whiteSpace: 'nowrap' }}>
            Confirm New Password:
          </p>
        </>
      ) : (
        <Link to="/profile/change-password" aria-label="Change password" style={{ width: '100%', height: '100%', display: 'block' }}>
          <img src={images.ChangePassword} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="Change password" />
        </Link>
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
      {active ? (
        <>
          <img
            src={images.ChangeEmail}
            style={{ width: '413px', height: '573px', position: 'absolute', left: 0, top: 0, maxWidth: 'none' }}
            alt="Change email form"
          />
          <img
            src={images.ConfirmButton}
            style={{ width: '180px', height: '60px', position: 'absolute', left: '145px', top: '262px', maxWidth: 'none' }}
            alt="Confirm"
          />
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '112px', height: '33px', position: 'absolute', left: '25px', top: '111px', whiteSpace: 'nowrap' }}>
            New Email:
          </p>
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '187px', height: '33px', position: 'absolute', left: '25px', top: '171px', whiteSpace: 'nowrap' }}>
            Confirmation Code:
          </p>
        </>
      ) : (
        <Link to="/profile/change-email" aria-label="Change email" style={{ width: '100%', height: '100%', display: 'block' }}>
          <img src={images.ChangeEmail} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="Change email" />
        </Link>
      )}
    </div>
  )
}

function BackToHome({ left, top }) {
  return (
    <Link
      to="/"
      aria-label="Return to home page"
      className="profile-arrow"
      style={{ width: '51px', height: '63px', position: 'absolute', left, top, display: 'block', zIndex: 10 }}
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

      {view === 'profile' ? (
        <Link
          to="/"
          aria-label="Return to home page"
          className="profile-arrow"
          style={{ width: '51px', height: '63px', position: 'absolute', left: '13px', top: '61px', display: 'block', zIndex: 10 }}
        >
          <img src={images.Arrowleft} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="" />
        </Link>
      ) : (
        <BackToHome
          left={view === 'change-password' ? '10px' : '10px'}
          top={view === 'change-password' ? '199px' : '373px'}
        />
      )}
    </div>
  )
}
