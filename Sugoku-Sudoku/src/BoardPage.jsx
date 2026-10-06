import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

const boardPenStyle = {
  width: '158px',
  height: '40px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  maxWidth: 'none',
  transform: 'translate(-50%, -50%) rotate(270deg)',
}
export default function BoardPage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div style={{ backgroundColor: "#757575", width: "100%", minHeight: "883px", maxWidth: "404px", position: "relative", margin: "0 auto", flexShrink: 0, textAlign: "left", overflow: "hidden" }}>
      <img
        src={images.BgDesk}
        style={{ width: "1268px", height: "881px", position: "absolute", left: "-554px", top: "3px", maxWidth: "none" }}
        alt="bgDeco"
      />
      <img
        src={images.HintDisplay}
        style={{ width: "143px", height: "169px", position: "absolute", left: "254px", top: "5px", maxWidth: "none" }}
        alt="HintDisplay"
      />
      <Link to="/" aria-label="Return to home page" style={{ width: "67px", height: "69px", position: "absolute", left: "9px", top: "9px", maxWidth: "none" , display: 'block', zIndex: 10 }}>
        <img src={images.Mainmenubutton} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="MainMenuButton" />
      </Link>
      <img
        src={images.BgInvitePage}
        style={{ width: "340px", height: "160px", position: "absolute", left: "64px", top: "723px", maxWidth: "none" }}
        alt="inviteBGpage"
      />
      <img
        src={images.Select7}
        style={{ width: "45px", height: "45px", position: "absolute", left: "178px", top: "665px", maxWidth: "none" }}
        alt="Select7"
      />
      <img
        src={images.Select4}
        style={{ width: "45px", height: "45px", position: "absolute", left: "178px", top: "600px", maxWidth: "none" }}
        alt="Select4"
      />
      <img
        src={images.Select6}
        style={{ width: "45px", height: "45px", position: "absolute", left: "305px", top: "600px", maxWidth: "none" }}
        alt="Select6"
      />
      <img
        src={images.Select3}
        style={{ width: "45px", height: "45px", position: "absolute", left: "305px", top: "536px", maxWidth: "none" }}
        alt="Select3"
      />
      <img
        src={images.Select9}
        style={{ width: "45px", height: "45px", position: "absolute", left: "305px", top: "665px", maxWidth: "none" }}
        alt="Select9"
      />
      <img
        src={images.Select1}
        style={{ width: "45px", height: "45px", position: "absolute", left: "178px", top: "536px", maxWidth: "none" }}
        alt="Select1"
      />
      <img
        src={images.Select5}
        style={{ width: "45px", height: "45px", position: "absolute", left: "242px", top: "600px", maxWidth: "none" }}
        alt="Select5"
      />
      <img
        src={images.Select8}
        style={{ width: "45px", height: "45px", position: "absolute", left: "242px", top: "665px", maxWidth: "none" }}
        alt="Select8"
      />
      <img
        src={images.Select2}
        style={{ width: "45px", height: "45px", position: "absolute", left: "242px", top: "536px", maxWidth: "none" }}
        alt="Select2"
      />
      <img
        src={images.InviteButton}
        style={{ width: "131px", height: "76px", position: "absolute", left: "14px", top: "704px", maxWidth: "none" }}
        alt="InviteButton"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "10px", top: "113px", maxWidth: "none" }}
        alt="Life1"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "59px", top: "113px", maxWidth: "none" }}
        alt="Life2"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "108px", top: "113px", maxWidth: "none" }}
        alt="Life3"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "157px", top: "113px", maxWidth: "none" }}
        alt="Life4"
      />
      <img
        src={images.LifeHeart}
        style={{ width: "38px", height: "35px", position: "absolute", left: "206px", top: "113px", maxWidth: "none" }}
        alt="Life5"
      />
      <img
        src={images.Takenote}
        style={{ width: "68px", height: "68px", position: "absolute", left: "90px", top: "587px", maxWidth: "none" }}
        alt="TakeNote"
      />
      <div style={{ width: "43px", height: "162px", position: "absolute", left: "30px", top: "539px" }}>
        <img
          src={images.MultiPen}
          style={boardPenStyle}
          alt="multi_pen"
        />
        <img
          src={images.CrayonPen}
          style={boardPenStyle}
          alt="crayon_pen"
        />
        <img
          src={images.BrushPen}
          style={boardPenStyle}
          alt="brush_pen"
        />
        <img
          src={images.MarkerPen}
          style={boardPenStyle}
          alt="marker_pen"
        />
        <img
          src={images.PenPen}
          style={boardPenStyle}
          alt="pen_pen"
        />
        <img
          src={images.InkPen}
          style={boardPenStyle}
          alt="ink_pen"
        />
        <img
          src={images.CheapPen}
          style={boardPenStyle}
          alt="cheap_pen"
        />
        <img
          src={images.QuillPen}
          style={boardPenStyle}
          alt="quill_pen"
        />
        <img
          src={images.MechPen}
          style={boardPenStyle}
          alt="mech_pen"
        />
        <img
          src={images.YatatePen}
          style={boardPenStyle}
          alt="yatate_pen"
        />
        <img
          src={images.StylusPen}
          style={boardPenStyle}
          alt="stylus_pen"
        />
        <img
          src={images.PencilPen}
          style={boardPenStyle}
          alt="pencil_pen"
        />
      </div>
      <div style={{ width: "100%", height: "400px", position: "absolute", left: "0px", top: "143px" }}>
        <img
          src={images.Board9x9}
          style={{ width: "100%", height: "400px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Board9x9"
        />
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "265px", top: "260px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(146,52,255,0.65) 34.62%,rgba(146,52,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#9234FF", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              5
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Victor Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 600, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "150px", top: "260px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}
          >
            <rect
              width="32"
              height="32"
              fill="url(#paint0_radial_1_268)"
              fillOpacity="0.65"
            />
            <defs>
              <radialGradient
                id="paint0_radial_1_268"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(16 16) rotate(90) scale(16)"
              >
                <stop offset="0.346154" stopColor="#9234FF" />
                <stop offset="1" stopColor="#9234FF" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "33px", top: "260px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'Oxygen Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'Oxygen Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'Libertinus Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'Oxygen Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(146,52,255,0.65) 34.62%,rgba(146,52,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#9234FF", fontFamily: "'Oxygen Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              5
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'Libertinus Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Libertinus Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Libertinus Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Libertinus Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "265px", top: "147px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'Kode Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'Kode Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'Kode Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'Kode Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(146,52,255,0.65) 34.62%,rgba(146,52,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#9234FF", fontFamily: "'Kode Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              5
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'Kode Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Red Hat Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Red Hat Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Red Hat Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "150px", top: "147px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'Red Hat Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'Red Hat Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'Red Hat Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'Space Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 700, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(146,52,255,0.65) 34.62%,rgba(146,52,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#9234FF", fontFamily: "'Space Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 700, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              5
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'Space Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 700, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Space Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 700, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Space Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 700, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Space Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 700, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "33px", top: "147px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'Syne Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'Syne Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'Syne Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'Syne Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(146,52,255,0.65) 34.62%,rgba(146,52,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#9234FF", fontFamily: "'Syne Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              5
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'Syne Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Xanh Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Xanh Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Xanh Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "33px", top: "35px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'Cutive Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'Cutive Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'Cutive Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(146,52,255,0.65) 34.62%,rgba(146,52,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#9234FF", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              5
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Intel One Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "150px", top: "35px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'LXGW WenKai Mono TC', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'LXGW WenKai Mono TC', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'LXGW WenKai Mono TC', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'LXGW WenKai Mono TC', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(146,52,255,0.65) 34.62%,rgba(146,52,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#9234FF", fontFamily: "'LXGW WenKai Mono TC', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              5
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'LXGW WenKai Mono TC', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Cutive Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Cutive Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Cutive Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
        <div style={{ width: "108px", height: "104px", position: "absolute", left: "265px", top: "35px" }}>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(226,28,97,0.65) 34.62%,rgba(226,28,97,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E21C61", fontFamily: "'Xanh Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              9
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(12,173,71,0.65) 34.62%,rgba(43,209,62,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#0CAD47", fontFamily: "'Xanh Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              8
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "72px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(0,255,178,0.65) 34.62%,rgba(69,255,168,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#00FFB2", fontFamily: "'Xanh Mono', monospace", fontSize: "30px", lineHeight: "36px", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              7
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,184,76,0.65) 34.62%,rgba(255,184,76,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FFB84C", fontFamily: "'Chivo Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 900, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              6
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(146,52,255,0.65) 34.62%,rgba(146,52,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#9234FF", fontFamily: "'Chivo Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 900, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              5
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "36px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(76,124,255,0.65) 34.62%,rgba(76,124,255,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#4C7CFF", fontFamily: "'Chivo Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 900, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              4
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "76px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(128,252,103,0.65) 34.62%,rgba(126,244,86,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#80FC67", fontFamily: "'Chivo Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 900, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              3
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "38px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(231,255,52,0.65) 34.62%,rgba(204,255,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#E7FF34", fontFamily: "'Chivo Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 900, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              2
            </p>
          </div>
          <div style={{ width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}>
            <div style={{ backgroundImage: "radial-gradient(50% 50% at 50% 50%,rgba(255,41,77,0.65) 34.62%,rgba(255,0,0,0.00) 100%)", width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px" }}></div>
            <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#FF294D", fontFamily: "'Chivo Mono', monospace", fontSize: "30px", lineHeight: "36px", fontWeight: 900, width: "32px", height: "32px", position: "absolute", left: "0px", top: "0px", textAlign: "center" }}>
              1
            </p>
          </div>
        </div>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "90px", top: "794px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "90px", top: "832px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "192px", top: "794px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "160px", top: "755px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "192px", top: "832px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "294px", top: "794px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "262px", top: "755px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "90px", height: "25px", position: "absolute", left: "294px", top: "832px" }}>
        <div style={{ borderRadius: "9px", borderWidth: "2px", borderStyle: "solid", borderColor: "#000", backgroundColor: "#F9EAE2", width: "85px", height: "25px", position: "absolute", left: "0px", top: "0px" }}></div>
        <div style={{ width: "14px", height: "14px", position: "absolute", left: "4px", top: "5px" }}></div>
        <p style={{ display: "flex", flexDirection: "column", justifyContent: "center", color: "#000", fontFamily: "'Piedra', serif", fontSize: "10px", width: "82px", height: "10px", position: "absolute", left: "8px", top: "8px", textAlign: "center" }}>
          friendO_135x7
        </p>
      </div>
      <div style={{ width: "55px", height: "55px", position: "absolute", left: "5px", top: "799px" }}></div>
      <p style={{ color: "#000", fontFamily: "'Piedra', serif", fontSize: "60px", lineHeight: "1", width: "42px", height: "44px", position: "absolute", left: "273px", top: "95px" }}>
        #
      </p>
    </div>
  );
}



