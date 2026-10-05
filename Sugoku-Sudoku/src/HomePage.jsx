import { Link } from 'react-router-dom'
import './App.css'

// Import All Images
import * as images from './figmages/index.js'

export default function HomePage() {
  return (
    <div className="bg-white min-w-screen min-h-screen overflow-hidden">
      <img
        src={images.BgHome}
        className="w-full h-full absolute left-0 top-0 max-w-none"
        alt="bgDeco"
      />
      <div className="w-[92px] h-[352px] absolute left-[380px] top-[515px]">
        <img
          src={images.MultiPen}
          className="w-[87px] h-[343px] absolute left-0 top-[5px] max-w-none"
          alt="multi_pen"
        />
        <img
          src={images.CrayonPen}
          className="w-[87px] h-[343px] absolute left-0 top-[5px] max-w-none"
          alt="crayon_pen"
        />
        <img
          src={images.BrushPen}
          className="w-[87px] h-[343px] absolute left-0 top-[5px] max-w-none"
          alt="brush_pen"
        />
        <img
          src={images.MarkerPen}
          className="w-[87px] h-[343px] absolute -left-[9px] top-0 max-w-none"
          alt="marker_pen"
        />
        <img
          src={images.PenPen}
          className="w-[87px] h-[343px] absolute left-0 top-0 max-w-none"
          alt="pen_pen"
        />
        <img
          src={images.InkPen}
          className="w-[87px] h-[343px] absolute -left-[3px] top-[5px] max-w-none"
          alt="ink_pen"
        />
        <img
          src={images.CheapPen}
          className="w-[87px] h-[343px] absolute left-0 top-[5px] max-w-none"
          alt="cheap_pen"
        />
        <img
          src={images.QuillPen}
          className="w-[87px] h-[344px] absolute left-0 top-[5px] max-w-none"
          alt="quill_pen"
        />
        <img
          src={images.MechPen}
          className="w-[87px] h-[343px] absolute left-0 top-[5px] max-w-none"
          alt="mech_pen"
        />
        <img
          src={images.YatatePen}
          className="w-[87px] h-[343px] absolute left-0 top-[5px] max-w-none"
          alt="yatate_pen"
        />
        <img
          src={images.StylusPen}
          className="w-[87px] h-[343px] absolute left-0 top-[5px] max-w-none"
          alt="stylus_pen"
        />
        <img
          src={images.PencilPen}
          className="w-[87px] h-[343px] absolute left-0 top-[5px] max-w-none"
          alt="pencil_pen"
        />
      </div>
      <div className="w-[50px] h-[51px] absolute left-[343px] top-2"></div>
      <Link
        to="/puzzle-reserve"
        aria-label="Open puzzle reserve"
        className="absolute -left-[65px] top-[622px] block h-[252px] w-[539px]"
      >
        <img
          src={images.Puzzledesk}
          className="h-full w-full max-w-none"
          alt="PuzzleDesk"
        />
      </Link>
      <img
        src={images.Levelprogressbar}
        className="w-[133px] h-[97px] absolute -left-[35px] top-[676px] max-w-none"
        alt="LevelProgressBar"
      />
      <img
        src={images.Shopdesk}
        className="w-[228px] h-[155px] absolute left-[300px] top-[310px] max-w-none"
        alt="ShopDesk"
      />
      <img
        src={images.Shopsign}
        className="w-[81px] h-[83px] absolute left-[329px] top-[193px] max-w-none"
        alt="ShopSign"
      />
      <Link
        to="/friends"
        aria-label="Open friends page"
        className="absolute -left-[35px] top-[210px] block h-[234px] w-[173px]"
      >
        <img
          src={images.Friends}
          className="h-full w-full max-w-none"
          alt="Friends"
        />
      </Link>
      <p className="text-[#000] font-piedra text-[22px] w-[31px] h-[29px] absolute left-[363px] top-[723px] tracking-[0.07em]">
        ##
      </p>
      <p className="text-[#000] font-piedra text-[22px] w-[31px] h-[29px] absolute left-[52px] top-[653px] tracking-[0.07em]">
        ##
      </p>
      <p className="text-[#000] font-piedra text-xl w-[31px] h-[26px] absolute left-[329px] top-[672px] tracking-[0.07em]">
        ##
      </p>
    </div>
  );
}
