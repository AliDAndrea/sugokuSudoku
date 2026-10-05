import { useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as images from './figmages/index.js'
import user from './user.js'

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
          <ProfileField label="Username: " value={user.username} top="118px" labelWidth="133px" />
          <ProfileField label="Level: " value={user.level} top="176px" labelWidth="74px" />
          <ProfileField label="Daily Streak: " value={user.dailyStreak} top="234px" labelWidth="162px" />
          <ProfileField label="Puzzles Complete: " value={user.puzzlesCompleted} top="294px" labelWidth="227px" />
          <ProfileField
            label="Fastest Time: "
            value={user.fastestTime}
            top="350px"
            labelWidth="166px"
          />
        </>
      ) : (
        <Link to="/profile" aria-label="Open profile" style={{ width: '100%', height: '100%', display: 'block' }}>
          <img src={images.Profile} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="Profile" />
        </Link>
      )}
    </div>
  )
}

function ProfileField({ label, value, top, labelWidth, valueFontSize = '22px' }) {
  return (
    <p style={{ color: '#000', fontFamily: 'Piedra, serif', fontSize: '32px', height: '42px', position: 'absolute', left: '31px', top, whiteSpace: 'nowrap' }}>
      <span style={{ display: 'inline-block', width: labelWidth }}>{label}</span>
      <span style={{ fontSize: valueFontSize, verticalAlign: 'baseline' }}>{value}</span>
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
          <p style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '25px', width: '183px', height: '33px', position: 'absolute', left: '28px', top: '108px', whiteSpace: 'nowrap' }}>
            Current Password:
          </p>
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
