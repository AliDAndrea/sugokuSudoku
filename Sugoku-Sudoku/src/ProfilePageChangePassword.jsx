import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function ProfileChangePasswordPage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'var(--font-piedra)', width: '100%', maxWidth: '404px', minHeight: '1259px', flexShrink: 0, position: 'relative', isolation: 'isolate', overflow: 'hidden', margin: '0 auto', textAlign: 'left' }}>
      <img
        src={images.BgSettings}
        style={{ width: '1452px', height: '1009px', position: 'absolute', left: '-629px', top: '-68px', maxWidth: 'none', zIndex: -1 }}
        alt="bgDeco"
      />
      <Link to="/profile" aria-label="Open profile" style={{ width: '396px', height: '549px', position: 'absolute', left: '3px', top: '49px', maxWidth: 'none' , display: "block" }}>
        <img src={images.Profile} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="ProfilePage" />
      </Link>
      <div style={{ width: '100%', height: '562px', position: 'absolute', left: '-2px', top: '188px', zIndex: 1 }}>
        <img
          src={images.ChangePassword}
          style={{ width: '100%', height: '562px', position: 'absolute', left: 0, top: 0, maxWidth: 'none' }}
          alt="Background"
        />
        <img
          src={images.ConfirmButton}
          style={{ width: '180px', height: '60px', position: 'absolute', left: '140px', top: '297px', maxWidth: 'none' }}
          alt="ConfirmButton"
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
      </div>
      <Link to="/profile/change-email" aria-label="Change email" style={{ width: '413px', height: '573px', position: 'absolute', left: '-5px', top: '686px', maxWidth: 'none' , display: "block", zIndex: 2 }}>
        <img src={images.ChangeEmail} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="ChangeEmailPage" />
      </Link>
      <Link
        to="/"
        aria-label="Return to home page"
        style={{ width: '51px', height: '63px', position: 'absolute', left: '59px', top: '199px', display: 'block', zIndex: 10 }}
      >
        <img
          src={images.Arrowleft}
          style={{ width: '100%', height: '100%', maxWidth: 'none' }}
          alt="PageLeft"
        />
      </Link>
    </div>
  );
}

