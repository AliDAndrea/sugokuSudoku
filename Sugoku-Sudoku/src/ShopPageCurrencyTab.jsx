import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function ShopPageCurrencyTab() {
  return (
    <div className="bg-[#FFF] min-w-screen min-h-screen overflow-hidden">
      <img
        src={images.BgShop}
        className="w-[1269px] h-[882px] absolute -left-[440px] -top-px max-w-none"
        alt="bgDeco"
      />
      <Link to="/shop/currency" aria-label="Open currency tab" className="w-[120px] h-[115px] absolute left-[293px] -top-px block z-10">
        <img src={images.CurrencyTab} className="w-full h-full max-w-none" alt="CurrencyTab" />
      </Link>
      <Link to="/shop/packs" aria-label="Open packs tab" className="w-[120px] h-[115px] absolute left-[184px] -top-[21px] block z-10">
        <img src={images.Packstab} className="w-full h-full max-w-none" alt="PacksTab" />
      </Link>
      <Link to="/shop/pens" aria-label="Open pens tab" className="w-[120px] h-[115px] absolute left-[75px] -top-[21px] block z-10">
        <img src={images.Penstab} className="w-full h-full max-w-none" alt="PensTab" />
      </Link>
      <img
        src={images.BuyButton}
        className="w-[167px] h-[102px] absolute left-[237px] top-[775px] max-w-none"
        alt="BuyButton"
      />
      <Link to="/" aria-label="Return to home page" className="w-[60px] h-[60px] absolute left-2 top-[11px] block z-10">
        <img src={images.BackButton} className="w-full h-full max-w-none" alt="BackButton" />
      </Link>
      <img
        src={images.HintsLabel}
        className="w-[185px] h-[75px] absolute left-[102px] top-[102px] max-w-none"
        alt="HintsLabel"
      />
      <div className="w-[119px] h-[83px] absolute left-[9px] top-[436px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[116px] h-[83px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-3xl w-24 h-[26px] absolute left-[23px] top-6">
          S 100
        </p>
      </div>
      <p className="text-[#000] font-piedra text-[80px] w-[162px] h-[26px] absolute left-[35px] top-[726px]">
        S100
      </p>
      <div className="w-[117px] h-[83px] absolute left-[139px] top-[436px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[116px] h-[83px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-3xl w-24 h-[26px] absolute left-[21px] top-6">
          S 500
        </p>
      </div>
      <div className="w-[113px] h-[105px] absolute left-[15px] top-52">
        <img
          src={images.PenPurchaseFrame}
          className="w-[105px] h-[105px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-[47px] w-[21px] h-[46px] absolute left-8 top-[15px]">
          1
        </p>
        <p className="text-[#000] font-piedra text-[25px] w-24 h-[26px] absolute left-[17px] top-[74px]">
          S 75
        </p>
      </div>
      <div className="w-[113px] h-[105px] absolute left-[148px] top-52">
        <img
          src={images.PenPurchaseFrame}
          className="w-[105px] h-[105px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-[47px] w-[21px] h-[46px] absolute left-8 top-[15px]">
          5
        </p>
        <p className="text-[#000] font-piedra text-[25px] w-24 h-[26px] absolute left-[17px] top-[74px]">
          S 375
        </p>
      </div>
      <div className="w-[113px] h-[105px] absolute left-[281px] top-52">
        <img
          src={images.PenPurchaseFrame}
          className="w-[105px] h-[105px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-[47px] w-11 h-[46px] absolute left-[13px] top-[15px]">
          10
        </p>
        <p className="text-[#000] font-piedra text-[25px] w-24 h-[26px] absolute left-[17px] top-[74px]">
          S 750
        </p>
      </div>
      <div className="w-[116px] h-[83px] absolute left-[72px] top-[540px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[116px] h-[83px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-3xl w-24 h-[26px] absolute left-3.5 top-6">
          S 2500
        </p>
      </div>
      <div className="w-[116px] h-[83px] absolute left-[269px] top-[436px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[116px] h-[83px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-3xl w-24 h-[26px] absolute left-[17px] top-6">
          S 1000
        </p>
      </div>
      <div className="w-[116px] h-[83px] absolute left-[202px] top-[540px]">
        <img
          src={images.PenPurchaseFrame}
          className="w-[116px] h-[83px] absolute left-0 top-0 max-w-none"
          alt="Frame"
        />
        <p className="text-[#000] font-piedra text-3xl w-[99px] h-[39px] absolute left-[9px] top-6">
          S 10000
        </p>
      </div>
      <p className="text-[#000] font-piedra text-5xl w-[146px] h-[26px] absolute left-[250px] top-[697px]">
        $####
      </p>
      <img
        src={images.SudoLabel}
        className="w-[442px] h-[76px] absolute -left-2.5 top-[342px] max-w-none"
        alt="image 1"
      />
    </div>
  );
}


