import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// Import All Images
import * as images from './figmages/index.js'

export default function Homebase() {
  return (
    <div className="bg-[#FFF] min-w-screen min-h-screen overflow-hidden">
      <img
        src={images.BgHome}
        className="w-full h-full absolute left-0 top-0 max-w-none"
        alt="bgDeco"
      />
      <div style={{
        width: "92px",
        height: "352px",
        position: "absolute",
        left: "380px",
        top: "515px"
      }}>
        <img
          src={images.MultiPen}
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center", // Horizontally centers
            alignItems: "center",
            left: 0,
            top: 0,
            width: 343,
            height: 87,
            
          }}
          alt="multi_pen"
        />
        <img
          src={images.CrayonPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="crayon_pen"
        />
        <img
          src={images.BrushPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="brush_pen"
        />
        <img
          src={images.MarkerPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="marker_pen"
        />
        <img
          src={images.PenPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="pen_pen"
        />
        <img
          src={images.InkPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="ink_pen"
        />
        <img
          src={images.CheapPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="cheap_pen"
        />
        <img
          src={images.QuillPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 344,
          }}
          alt="quill_pen"
        />
        <img
          src={images.MechPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="mech_pen"
        />
        <img
          src={images.YatatePen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="yatate_pen"
        />
        <img
          src={images.StylusPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="stylus_pen"
        />
        <img
          src={images.PencilPen}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 87,
            height: 343,
          }}
          alt="pencil_pen"
        />
      </div>
      <div style={{
        position: "absolute",
        left: 343,
        top: 2,
        width: 50,
        height: 51,
      }}></div>
      <img
        src={images.Puzzledesk}
        style={{
          position: "absolute",
          left: -65,
          top: 622,
          width: 539,
          height: 252,
        }}
        alt="PuzzleDesk"
      />
      <img
        src={images.Levelprogressbar}
        style={{
          position: "absolute",
          left: -35,
          top: 676,
          width: 133,
          height: 97,
        }}
        alt="LevelProgressBar"
      />
      <img
        src={images.Shopdesk}
        style={{
          position: "absolute",
          left: 300,
          top: 310,
          width: 228,
          height: 155,
        }}
        alt="ShopDesk"
      />
      <img
        src={images.Shopsign}
        style={{
          position: "absolute",
          left: 329,
          top: 193,
          width: 81,
          height: 83,
        }}
        alt="ShopSign"
      />
      <img
        src={images.Friends}
        style={{
          position: "absolute",
          left: -35,
          top: 210,
          width: 173,
          height: 234,
        }}
        alt="Friends"
      />
      <p style={{
        color: "#000",
        fontFamily: "Piedra",
        fontSize: "22px",
        width: 31,
        height: 29,
        position: "absolute",
        left: 363,
        top: 723,
        letterSpacing: "0.07em"
      }}>
        ##
      </p>
      <p style={{
        color: "#000",
        fontFamily: "Piedra",
        fontSize: "22px",
        width: 31,
        height: 29,
        position: "absolute",
        left: 52,
        top: 653,
        letterSpacing: "0.07em"
      }}>
        ##
      </p>
      <p style={{
        color: "#000",
        fontFamily: "Piedra",
        fontSize: "xl",
        width: 31,
        height: 26,
        position: "absolute",
        left: 329,
        top: 672,
        letterSpacing: "0.07em"
      }}>
        ##
      </p>
    </div>
  );
}