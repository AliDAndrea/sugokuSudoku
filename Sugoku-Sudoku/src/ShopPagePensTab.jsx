import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function ShopPagePensTab() {
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
      <Link
        to="/shop/packs"
        aria-label="Open packs tab"
        style={{ width: "120px", height: "115px", position: "absolute", left: "184px", top: "-21px", display: "block", zIndex: 10 }}
      >
        <img
          src={images.Packstab}
          style={{ width: "100%", height: "100%", maxWidth: "none" }}
          alt="PacksTab"
        />
      </Link>
      <Link to="/shop/pens" aria-label="Open pens tab" style={{ width: "120px", height: "115px", position: "absolute", left: "75px", top: "0px", display: "block", zIndex: 10 }}>
        <img src={images.Penstab} style={{ width: "100%", height: "100%", maxWidth: "none" }} alt="PensTab" />
      </Link>
      <img
        src={images.BuyButton}
        style={{ width: "167px", height: "102px", position: "absolute", left: "237px", top: "775px", maxWidth: "none" }}
        alt="BuyButton"
      />
      <Link
        to="/"
        aria-label="Return to home page"
        style={{ width: "60px", height: "60px", position: "absolute", left: "8px", top: "11px", display: "block", zIndex: 10 }}
      >
        <img
          src={images.BackButton}
          style={{ width: "100%", height: "100%", maxWidth: "none" }}
          alt="BackButton"
        />
      </Link>
      <div style={{ width: "50px", height: "207px", position: "absolute", left: "10px", top: "675px" }}>
        <img
          src={images.PencilPen}
          style={{ width: "198px", height: "50px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-90deg)" }}
          alt="pencil_pen"
        />
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "23px", top: "120px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", opacity: 0.5, width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.PencilPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="pencil_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "148px", top: "534px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.InkPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="ink_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "148px", top: "120px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.MechPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="mech_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "148px", top: "258px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.BrushPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="brush_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "273px", top: "396px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.StylusPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="stylus_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "148px", top: "396px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.PenPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="pen_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "23px", top: "534px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.QuillPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="quill_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "23px", top: "258px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.CrayonPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="crayon_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "273px", top: "258px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.YatatePen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="yatate_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "23px", top: "396px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.MarkerPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="marker_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "273px", top: "120px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.CheapPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="cheap_pen"
          />
        </div>
      </div>
      <div style={{ width: "106px", height: "122px", position: "absolute", left: "273px", top: "534px" }}>
        <img
          src={images.PenPurchaseFrame}
          style={{ width: "106px", height: "122px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt="Frame"
        />
        <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "24px", lineHeight: "32px", width: "85px", height: "26px", position: "absolute", left: "17px", top: "91px" }}>
          S####
        </p>
        <div style={{ opacity: 0.5, width: "106px", height: "90px", position: "absolute", left: 0, top: 0 }}>
          <img
            src={images.MultiPen}
            style={{ width: "102px", height: "26px", position: "absolute", left: "50%", top: "50%", maxWidth: "none", transform: "translate(-50%, -50%) rotate(-45deg)", transformOrigin: "center" }}
            alt="multi_pen"
          />
        </div>
      </div>
      <p style={{ color: "#000", fontFamily: "var(--font-piedra)", fontSize: "48px", lineHeight: "1", width: "146px", height: "26px", position: "absolute", left: "251px", top: "697px" }}>
        S####
      </p>
      <div style={{ color: "#000", fontFamily: "'Intel One Mono', monospace", fontSize: "40px", lineHeight: 1, width: "155px", height: "182px", position: "absolute", left: "70px", top: "691px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(3, 1fr)", placeItems: "center" }}>
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
    </div>
  );
}



