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
      <div className="w-23 h-88 absolute left-95 top-128.75">
        <img
          src={images.MultiPen}
          className="w-21.75 h-85.75 absolute left-0 top-1.25 max-w-none"
          alt="multi_pen"
        />
        <img
          src={images.CrayonPen}
          className="w-21.75 h-85.75 absolute left-0 top-1.25 max-w-none"
          alt="crayon_pen"
        />
        <img
          src={images.BrushPen}
          className="w-21.75 h-85.75 absolute left-0 top-1.25 max-w-none"
          alt="brush_pen"
        />
        <img
          src={images.MarkerPen}
          className="w-21.75 h-85.75 absolute -left-2.25 top-0 max-w-none"
          alt="marker_pen"
        />
        <img
          src={images.PenPen}
          className="w-21.75 h-85.75 absolute left-0 top-0 max-w-none"
          alt="pen_pen"
        />
        <img
          src={images.InkPen}
          className="w-21.75 h-85.75 absolute -left-0.75 top-1.25 max-w-none"
          alt="ink_pen"
        />
        <img
          src={images.CheapPen}
          className="w-21.75 h-85.75 absolute left-0 top-1.25 max-w-none"
          alt="cheap_pen"
        />
        <img
          src={images.QuillPen}
          className="w-21.75 h-86 absolute left-0 top-1.25 max-w-none"
          alt="quill_pen"
        />
        <img
          src={images.MechPen}
          className="w-21.75 h-85.75 absolute left-0 top-1.25 max-w-none"
          alt="mech_pen"
        />
        <img
          src={images.YatatePen}
          className="w-21.75 h-85.75 absolute left-0 top-1.25 max-w-none"
          alt="yatate_pen"
        />
        <img
          src={images.StylusPen}
          className="w-21.75 h-85.75 absolute left-0 top-1.25 max-w-none"
          alt="stylus_pen"
        />
        <img
          src={images.PencilPen}
          className="w-21.75 h-85.75 absolute left-0 top-1.25 max-w-none"
          alt="pencil_pen"
        />
      </div>
      <div className="w-12.5 h-12.75 absolute left-85.75 top-2"></div>
      <img
        src={images.Puzzledesk}
        className="w-134.75 h-63 absolute -left-16.25 top-155.5 max-w-none"
        alt="PuzzleDesk"
      />
      <img
        src={images.Levelprogressbar}
        className="w-33.25 h-24.25 absolute -left-8.75 top-169 max-w-none"
        alt="LevelProgressBar"
      />
      <img
        src={images.Shopdesk}
        className="w-57 h-38.75 absolute left-75 top-77.5 max-w-none"
        alt="ShopDesk"
      />
      <img
        src={images.Shopsign}
        className="w-20.25 h-20.75 absolute left-82.25 top-48.25 max-w-none"
        alt="ShopSign"
      />
      <Link
        to="/friends"
        aria-label="Open friends page"
        className="absolute -left-8.75 top-52.5 block h-58.5 w-43.25"
      >
        <img
          src={images.Friends}
          className="h-full w-full max-w-none"
          alt="Friends"
        />
      </Link>
      <p className="text-black font-piedra text-[22px] w-7.75 h-7.25 absolute left-90.75 top-180.75 tracking-[0.07em]">
        ##
      </p>
      <p className="text-black font-piedra text-[22px] w-7.75 h-7.25 absolute left-13 top-163.25 tracking-[0.07em]">
        ##
      </p>
      <p className="text-black font-piedra text-xl w-7.75 h-6.5 absolute left-82.25 top-168 tracking-[0.07em]">
        ##
      </p>
    </div>
  );
}