import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function ProfilePage() {
  return (
    <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "404px", minHeight: "1263px", position: "relative", overflow: "hidden", margin: "0 auto", textAlign: "left" }}>
      <img
        src={images.BgSettings}
        style={{ width: "1452px", height: "1009px", position: "absolute", left: "-629px", top: "-68px", maxWidth: "none" }}
        alt="bgDeco"
      />
      <div style={{ width: "396px", height: "549px", position: "absolute", left: "4px", top: "51px" }}>
        <img
          src={images.Profile}
          style={{ width: "396px", height: "549px", position: "absolute", left: 0, top: 0, maxWidth: "none" }}
          alt="Background"
        />
        <p style={{ color: "#000", fontFamily: "Piedra, serif", fontSize: "32px", width: "133px", height: "42px", position: "absolute", left: "31px", top: "118px", whiteSpace: "nowrap" }}>
          Username:
        </p>
        <p style={{ color: "#000", fontFamily: "Piedra, serif", fontSize: "32px", width: "74px", height: "42px", position: "absolute", left: "31px", top: "176px", whiteSpace: "nowrap" }}>
          Level:
        </p>
        <p style={{ color: "#000", fontFamily: "Piedra, serif", fontSize: "32px", width: "162px", height: "42px", position: "absolute", left: "31px", top: "234px", whiteSpace: "nowrap" }}>
          Daily Streak:
        </p>
        <p style={{ color: "#000", fontFamily: "Piedra, serif", fontSize: "32px", width: "227px", height: "42px", position: "absolute", left: "31px", top: "294px", whiteSpace: "nowrap" }}>
          Puzzles Complete:
        </p>
        <p style={{ color: "#000", fontFamily: "Piedra, serif", fontSize: "32px", width: "166px", height: "42px", position: "absolute", left: "31px", top: "350px", whiteSpace: "nowrap" }}>
          Fastest Time:
        </p>
      </div>
      <Link
        to="/profile/change-password"
        aria-label="Change password"
        style={{ width: "100%", height: "562px", position: "absolute", left: "-2px", top: "525px", display: "block" }}
      >
        <img
          src={images.ChangePassword}
          style={{ width: "100%", height: "100%", maxWidth: "none" }}
          alt="ChangePasswordPage"
        />
      </Link>
      <Link to="/profile/change-email" aria-label="Change email" style={{ width: "413px", height: "573px", position: "absolute", left: "-4px", top: "690px", maxWidth: "none" , display: "block", zIndex: 2 }}>
        <img src={images.ChangeEmail} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="ChangeEmailPage" />
      </Link>
      <Link
        to="/"
        aria-label="Return to home page"
        style={{ width: "51px", height: "63px", position: "absolute", left: "63px", top: "61px", display: "block", zIndex: 10 }}
      >
        <img
          src={images.Arrowleft}
          style={{ width: "100%", height: "100%", maxWidth: "none" }}
          alt="PageLeft"
        />
      </Link>
    </div>
  );
}


