import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function BoardCreatorPage() {
  return (
    <div className="min-w-screen min-h-screen overflow-hidden">
      <img
        src={images.BgDesk}
        className="w-[1268px] h-[881px] absolute -left-[409px] -top-1 max-w-none"
        alt="BGDeco"
      />
      <img
        src={images.Board6x6}
        className="w-[366px] h-[362px] absolute left-[18px] top-[482px] max-w-none"
        alt="Board6x6"
      />
      <img
        src={images.Board9x9}
        className="w-[366px] h-[362px] absolute left-[18px] top-[482px] max-w-none"
        alt="Board9x9"
      />
      <Link
        to="/"
        aria-label="Return to home page"
        className="w-[67px] h-[69px] absolute left-[7px] top-2 block z-10"
      >
        <img
          src={images.Mainmenubutton}
          className="w-full h-full max-w-none"
          alt="MainMenuButton"
        />
      </Link>
      <p className="text-[#000] font-piedra text-[40px] w-[286px] h-[52px] absolute left-24 top-[27px] tracking-[0.08em]">
        Capacity 08&#x2F;30
      </p>
      <div className="w-full h-[555px] absolute left-0.5 top-[108px]">
        <img
          src={images.CreateBoard}
          className="w-full h-[555px] absolute left-0 top-0 max-w-none"
          alt="Background"
        />
        <div className="opacity-40 bg-[#06FFFF] w-[86px] h-[21px] absolute left-[57px] top-[189px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[86px] h-[21px] absolute left-[57px] top-[210px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[94px] h-[21px] absolute left-[188px] top-[187px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[111px] h-[21px] absolute left-[187px] top-[250px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[116px] h-[21px] absolute left-[188px] top-52"></div>
        <div className="opacity-40 bg-[#06FFFF] w-32 h-[21px] absolute left-[187px] top-[271px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[86px] h-[21px] absolute left-[188px] top-[229px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[105px] h-[21px] absolute left-[79px] top-[387px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[105px] h-[21px] absolute left-[79px] top-[408px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[167px] h-11 absolute left-[216px] top-[367px]"></div>
        <div className="opacity-40 bg-[#06FFFF] w-[105px] h-[21px] absolute left-[79px] top-[429px]"></div>
      </div>
    </div>
  );
}
