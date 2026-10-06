import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function ShopPageCurrencyTab() {
  return (
    <div style={{ backgroundColor: "#FFF", width: "100%", minHeight: "882px", maxWidth: "404px", position: "relative", margin: "0 auto", flexShrink: 0, textAlign: "left", overflow: "hidden" }}>
      <img
        src={images.BgShop}
        style={{ width: "1269px", height: "882px", position: "absolute", left: "-440px", top: "-1px", maxWidth: "none" }}
        alt="bgDeco"
      />
      <Link to="/shop/currency" aria-label="Open currency tab" style={{ width: "120px", height: "115px", position: "absolute", left: "293px", top: "-1px", display: "block", zIndex: 10 }}>
        <img src={images.CurrencyTab} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="CurrencyTab" />
      </Link>
      <Link to="/shop/packs" aria-label="Open packs tab" style={{ width: "120px", height: "115px", position: "absolute", left: "184px", top: "-21px", display: "block", zIndex: 10 }}>
        <img src={images.Packstab} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="PacksTab" />
      </Link>
      <Link to="/shop/pens" aria-label="Open pens tab" style={{ width: "120px", height: "115px", position: "absolute", left: "75px", top: "-21px", display: "block", zIndex: 10 }}>
        <img src={images.Penstab} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="PensTab" />
      </Link>
      <img
        src={images.BuyButton}
        style={{ width: "167px", height: "102px", position: "absolute", left: "237px", top: "775px", maxWidth: "none" }}
        alt="BuyButton"
      />
      <Link to="/" aria-label="Return to home page" style={{ width: "60px", height: "60px", position: "absolute", left: "8px", top: "11px", display: "block", zIndex: 10 }}>
        <img src={images.BackButton} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="BackButton" />
      </Link>
      <img
        src={images.HintsLabel}
        style={{ width: "185px", height: "75px", position: "absolute", left: "102px", top: "102px", maxWidth: "none" }}
        alt="HintsLabel"
      />
      <div style={{ width: "119px", height: "83px", position: "absolute", left: "9px", top: "436px" }}>
        <img
          src={images.SudoPurchaseFrame}
          style={{ width: "116px", height: "83px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Sudo purchase frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "26px", lineHeight: 1, width: "106px", height: "73px", position: "absolute", left: "5px", top: "5px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          S 100
        </p>
      </div>
      <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "80px", width: "162px", height: "26px", position: "absolute", left: "35px", top: "726px" }}>
        S100
      </p>
      <div style={{ width: "117px", height: "83px", position: "absolute", left: "139px", top: "436px" }}>
        <img
          src={images.SudoPurchaseFrame}
          style={{ width: "116px", height: "83px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Sudo purchase frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "26px", lineHeight: 1, width: "106px", height: "73px", position: "absolute", left: "5px", top: "5px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          S 500
        </p>
      </div>
      <div style={{ width: "113px", height: "105px", position: "absolute", left: "15px", top: "208px" }}>
        <img
          src={images.HintPurchaseFrame}
          style={{ width: "105px", height: "105px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Hint purchase frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "47px", lineHeight: 1, width: "48px", height: "68px", position: "absolute", left: "5px", top: "5px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          1
        </p>
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "22px", lineHeight: 1, width: "95px", height: "22px", position: "absolute", left: "5px", top: "79px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          S 75
        </p>
      </div>
      <div style={{ width: "113px", height: "105px", position: "absolute", left: "148px", top: "208px" }}>
        <img
          src={images.HintPurchaseFrame}
          style={{ width: "105px", height: "105px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Hint purchase frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "47px", lineHeight: 1, width: "48px", height: "68px", position: "absolute", left: "5px", top: "5px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          5
        </p>
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "22px", lineHeight: 1, width: "95px", height: "22px", position: "absolute", left: "5px", top: "79px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          S 375
        </p>
      </div>
      <div style={{ width: "113px", height: "105px", position: "absolute", left: "281px", top: "208px" }}>
        <img
          src={images.HintPurchaseFrame}
          style={{ width: "105px", height: "105px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Hint purchase frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "47px", lineHeight: 1, width: "48px", height: "68px", position: "absolute", left: "5px", top: "5px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          10
        </p>
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "22px", lineHeight: 1, width: "95px", height: "22px", position: "absolute", left: "5px", top: "79px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          S 750
        </p>
      </div>
      <div style={{ width: "116px", height: "83px", position: "absolute", left: "72px", top: "540px" }}>
        <img
          src={images.SudoPurchaseFrame}
          style={{ width: "116px", height: "83px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Sudo purchase frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "26px", lineHeight: 1, width: "106px", height: "73px", position: "absolute", left: "5px", top: "5px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          S 2500
        </p>
      </div>
      <div style={{ width: "116px", height: "83px", position: "absolute", left: "269px", top: "436px" }}>
        <img
          src={images.SudoPurchaseFrame}
          style={{ width: "116px", height: "83px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Sudo purchase frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "26px", lineHeight: 1, width: "106px", height: "73px", position: "absolute", left: "5px", top: "5px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          S 1000
        </p>
      </div>
      <div style={{ width: "116px", height: "83px", position: "absolute", left: "202px", top: "540px" }}>
        <img
          src={images.SudoPurchaseFrame}
          style={{ width: "116px", height: "83px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Sudo purchase frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "26px", lineHeight: 1, width: "106px", height: "73px", position: "absolute", left: "5px", top: "5px", display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap" }}>
          S 10000
        </p>
      </div>
      <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "48px", lineHeight: "1", width: "146px", height: "26px", position: "absolute", left: "250px", top: "697px" }}>
        $####
      </p>
      <img
        src={images.SudoLabel}
        style={{ width: "442px", height: "76px", position: "absolute", left: "-10px", top: "342px", maxWidth: "none" }}
        alt="image 1"
      />
    </div>
  );
}




