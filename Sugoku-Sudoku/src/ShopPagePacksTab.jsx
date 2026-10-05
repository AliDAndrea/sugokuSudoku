import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function ShopPagePacksTab() {
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
      <img
        src={images.Packstabbackground}
        className="w-[438px] h-[591px] absolute -left-3 top-[87px] max-w-none"
        alt="PacksTabBackground"
      />
      <Link to="/shop/pens" aria-label="Open pens tab" className="w-[120px] h-[115px] absolute left-[75px] -top-[21px] block z-10">
        <img src={images.Penstab} className="w-full h-full max-w-none" alt="PensTab" />
      </Link>
      <img
        src={images.BuyButton}
        className="w-[167px] h-[102px] absolute left-[237px] top-[775px] max-w-none"
        alt="BuyButton"
      />
      <img
        src={images.BoughtLabel}
        className="w-[360px] h-[180px] absolute left-[26px] top-[677px] max-w-none"
        alt="BoughtLabel"
      />
      <Link to="/" aria-label="Return to home page" className="w-[60px] h-[60px] absolute left-2 top-[11px] block z-10">
        <img src={images.BackButton} className="w-full h-full max-w-none" alt="BackButton" />
      </Link>
      <img
        src={images.ChallangePackTemplate}
        className="w-[75px] h-[75px] absolute left-[59px] top-[172px] max-w-none"
        alt="UnlockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[185px] top-[172px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[185px] top-[380px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[59px] top-[380px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[311px] top-[172px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[311px] top-[380px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[185px] top-[276px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[59px] top-[276px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[185px] top-[484px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[59px] top-[484px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[185px] top-[588px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[59px] top-[588px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[311px] top-[276px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[311px] top-[484px] max-w-none"
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        className="w-[75px] h-[75px] absolute left-[311px] top-[588px] max-w-none"
        alt="LockedBoard"
      />
      <Link to="/shop/packs" aria-label="Open packs tab" className="w-[120px] h-[115px] absolute left-[184px] -top-px block z-10">
        <img src={images.Packstab} className="w-full h-full max-w-none" alt="PacksTab" />
      </Link>
    </div>
  );
}

