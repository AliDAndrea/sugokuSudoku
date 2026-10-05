import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function ShopPagePensTab() {
  return (
    <div className="bg-[#FFF] min-w-screen min-h-screen overflow-hidden">
      <img
        src={images.BgShop}
        className="w-[1269px] h-[882px] absolute -left-[440px] -top-px max-w-none"
        alt="BackgroundColor"
      />
      <Link to="/shop/currency" aria-label="Open currency tab" className="w-[120px] h-[115px] absolute left-[292px] -top-[21px] block z-10">
        <img src={images.CurrencyTab} className="w-full h-full max-w-none" alt="CurrencyTab" />
      </Link>
      <Link
        to="/shop/packs"
        aria-label="Open packs tab"
        className="w-[120px] h-[115px] absolute left-[184px] -top-[21px] block z-10"
      >
        <img
          src={images.Packstab}
          className="w-full h-full max-w-none"
          alt="PacksTab"
        />
      </Link>
      <Link to="/shop/pens" aria-label="Open pens tab" className="w-[120px] h-[115px] absolute left-[75px] top-0 block z-10">
        <img src={images.Penstab} className="w-full h-full max-w-none" alt="PensTab" />
      </Link>
      <img
        src={images.BuyButton}
        className="w-[167px] h-[102px] absolute left-[237px] top-[775px] max-w-none"
        alt="BuyButton"
      />
      <Link
        to="/"
        aria-label="Return to home page"
        className="w-[60px] h-[60px] absolute left-2 top-[11px] block z-10"
      >
        <img
          src={images.BackButton}
          className="w-full h-full max-w-none"
          alt="BackButton"
        />
      </Link>
      <div className="w-[50px] h-[198px] absolute left-px top-[675px]">
        <img
          src={images.PencilPen}
          className="w-[50px] h-[198px] absolute -left-0 -top-0 max-w-none"
          alt="pencil_pen"
        />
      </div>
      <div className="w-[106px] h-[122px] absolute left-[23px] top-[120px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl opacity-50 w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.PencilPen}
            className="w-[26px] h-[102px] absolute left-0 top-0 max-w-none"
            alt="pencil_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[148px] top-[534px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-2">
          <img
            src={images.InkPen}
            className="w-[26px] h-[102px] absolute left-0 -top-0 max-w-none"
            alt="ink_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[148px] top-[120px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.MechPen}
            className="w-[26px] h-[102px] absolute left-0 top-0 max-w-none"
            alt="mech_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[148px] top-[258px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.BrushPen}
            className="w-[26px] h-[102px] absolute left-0 -top-0 max-w-none"
            alt="brush_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[273px] top-[396px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.StylusPen}
            className="w-[26px] h-[102px] absolute left-0 top-0 max-w-none"
            alt="stylus_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[148px] top-[396px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[86px] top-1.5">
          <img
            src={images.PenPen}
            className="w-[26px] h-[102px] absolute -left-0 top-0 max-w-none"
            alt="pen_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[23px] top-[534px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.QuillPen}
            className="w-[26px] h-[102px] absolute -left-0 top-0 max-w-none"
            alt="quill_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[23px] top-[258px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.CrayonPen}
            className="w-[26px] h-[102px] absolute left-0 -top-0 max-w-none"
            alt="crayon_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[273px] top-[258px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.YatatePen}
            className="w-[26px] h-[102px] absolute left-0 top-0 max-w-none"
            alt="yatate_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[23px] top-[396px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[84px] top-2">
          <img
            src={images.MarkerPen}
            className="w-[26px] h-[102px] absolute left-0 -top-0 max-w-none"
            alt="marker_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[273px] top-[120px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.CheapPen}
            className="w-[26px] h-[102px] absolute left-0 top-0 max-w-none"
            alt="cheap_pen"
          />
        </div>
      </div>
      <div className="w-[106px] h-[122px] absolute left-[273px] top-[534px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[106px] h-[122px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-2xl w-[85px] h-[26px] absolute left-[17px] top-[91px]">
          S####
        </p>
        <div className="opacity-50 w-[26px] h-[102px] absolute left-[87px] top-[7px]">
          <img
            src={images.MultiPen}
            className="w-[26px] h-[102px] absolute left-0 -top-0 max-w-none"
            alt="multi_pen"
          />
        </div>
      </div>
      <p className="text-[#000] font-piedra text-5xl w-[146px] h-[26px] absolute left-[251px] top-[697px]">
        S####
      </p>
      <p className="text-[#000] font-intelOneMono text-[40px] w-[172px] h-[165px] absolute left-[53px] top-[691px]">
        1 2 3 4 5 6 7 8 9
      </p>
    </div>
  );
}


