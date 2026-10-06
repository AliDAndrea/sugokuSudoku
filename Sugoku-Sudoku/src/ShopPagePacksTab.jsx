import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function ShopPagePacksTab() {
  return (
    <div style={{ backgroundColor: "#FFF", width: "100%", minHeight: "882px", maxWidth: "404px", position: "relative", margin: "0 auto", flexShrink: 0, textAlign: "left", overflow: "hidden" }}>
      <img
        src={images.BgShop}
        style={{ width: "1269px", height: "882px", position: "absolute", left: "-440px", top: "-1px", maxWidth: "none" }}
        alt="BackgroundColor"
      />
      <Link to="/shop/currency" aria-label="Open currency tab" style={{ width: "120px", height: "115px", position: "absolute", left: "292px", top: "-21px", display: "block", zIndex: 10 }}>
        <img src={images.CurrencyTab} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="CurrencyTab" />
      </Link>
      <img
        src={images.Packstabbackground}
        style={{ width: "438px", height: "591px", position: "absolute", left: "-12px", top: "87px", maxWidth: "none" }}
        alt="PacksTabBackground"
      />
      <Link to="/shop/pens" aria-label="Open pens tab" style={{ width: "120px", height: "115px", position: "absolute", left: "75px", top: "-21px", display: "block", zIndex: 10 }}>
        <img src={images.Penstab} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="PensTab" />
      </Link>
      <img
        src={images.BuyButton}
        style={{ width: "167px", height: "102px", position: "absolute", left: "237px", top: "775px", maxWidth: "none" }}
        alt="BuyButton"
      />
      <img
        src={images.BoughtLabel}
        style={{ width: "360px", height: "180px", position: "absolute", left: "26px", top: "677px", maxWidth: "none" }}
        alt="BoughtLabel"
      />
      <Link to="/" aria-label="Return to home page" style={{ width: "60px", height: "60px", position: "absolute", left: "8px", top: "11px", display: "block", zIndex: 10 }}>
        <img src={images.BackButton} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="BackButton" />
      </Link>
      <img
        src={images.ChallangePackTemplate}
        style={{ width: "75px", height: "75px", position: "absolute", left: "59px", top: "172px", maxWidth: "none" }}
        alt="UnlockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "185px", top: "172px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "185px", top: "380px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "59px", top: "380px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "311px", top: "172px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "311px", top: "380px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "185px", top: "276px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "59px", top: "276px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "185px", top: "484px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "59px", top: "484px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "185px", top: "588px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "59px", top: "588px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "311px", top: "276px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "311px", top: "484px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <img
        src={images.Lockedboard}
        style={{ width: "75px", height: "75px", position: "absolute", left: "311px", top: "588px", maxWidth: "none" }}
        alt="LockedBoard"
      />
      <Link to="/shop/packs" aria-label="Open packs tab" style={{ width: "120px", height: "115px", position: "absolute", left: "184px", top: "-1px", display: "block", zIndex: 10 }}>
        <img src={images.Packstab} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="PacksTab" />
      </Link>
    </div>
  );
}

