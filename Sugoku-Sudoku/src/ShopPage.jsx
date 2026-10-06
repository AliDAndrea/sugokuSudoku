import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'
import { penItems } from './PenItem.jsx'

const tabs = [
  { id: 'pens', label: 'Pens', image: images.Penstab, left: 75 },
  { id: 'packs', label: 'Packs', image: images.Packstab, left: 184 },
  { id: 'currency', label: 'Currency', image: images.CurrencyTab, left: 292 },
]

export default function ShopPage({ initialTab = 'pens' }) {
  const [activeTab, setActiveTab] = useState(initialTab)
  const [ownedPens, setOwnedPens] = useState(() => new Set(penItems.filter((pen) => pen.owned).map((pen) => pen.name)))

  return (
    <div style={{ backgroundColor: '#FFF', width: '100%', minHeight: '882px', maxWidth: '404px', position: 'relative', margin: '0 auto', flexShrink: 0, textAlign: 'left', overflow: 'hidden' }}>
      <img src={images.BgShop} style={{ width: '1269px', height: '882px', position: 'absolute', left: '-440px', top: '-1px', maxWidth: 'none' }} alt="" />
      <nav aria-label="Shop tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-label={`Open ${tab.label.toLowerCase()} tab`}
            aria-pressed={activeTab === tab.id}
            aria-controls="shop-content"
            onClick={() => setActiveTab(tab.id)}
            style={{ width: '120px', height: '115px', position: 'absolute', left: tab.left, top: activeTab === tab.id ? 0 : -21, display: 'block', zIndex: 10, padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}
          >
            <img src={tab.image} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="" />
          </button>
        ))}
      </nav>
      <div id="shop-content" role="region" aria-label={`${activeTab} shop`}>
        {activeTab === 'pens' && (
          <PensContent
            ownedPens={ownedPens}
            onBuyPen={(pen) => setOwnedPens((current) => new Set(current).add(pen.name))}
          />
        )}
        {activeTab === 'packs' && <PacksContent />}
        {activeTab === 'currency' && <CurrencyContent />}
      </div>
      {activeTab !== 'pens' && (
        <img src={images.BuyButton} style={{ width: '167px', height: '102px', position: 'absolute', right: '-1px', bottom: '-2px', maxWidth: 'none' }} alt="BuyButton" />
      )}
      <Link to="/" aria-label="Return to home page" style={{ width: '60px', height: '60px', position: 'absolute', left: '8px', top: '11px', display: 'block', zIndex: 10 }}>
        <img src={images.BackButton} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="BackButton" />
      </Link>
    </div>
  )
}

function PensContent({ ownedPens, onBuyPen }) {
  const penCards = [
    { item: penItems.find((pen) => pen.name === 'Pencil Pen'), left: '23px', top: '120px' },
    { item: penItems.find((pen) => pen.name === 'Ink Pen'), left: '148px', top: '534px' },
    { item: penItems.find((pen) => pen.name === 'Mechanical Pen'), left: '148px', top: '120px' },
    { item: penItems.find((pen) => pen.name === 'Brush Pen'), left: '148px', top: '258px' },
    { item: penItems.find((pen) => pen.name === 'Stylus Pen'), left: '273px', top: '396px' },
    { item: penItems.find((pen) => pen.name === 'Pen Pen'), left: '148px', top: '396px' },
    { item: penItems.find((pen) => pen.name === 'Quill Pen'), left: '23px', top: '534px' },
    { item: penItems.find((pen) => pen.name === 'Crayon Pen'), left: '23px', top: '258px' },
    { item: penItems.find((pen) => pen.name === 'Yatate Pen'), left: '273px', top: '258px' },
    { item: penItems.find((pen) => pen.name === 'Marker Pen'), left: '23px', top: '396px' },
    { item: penItems.find((pen) => pen.name === 'Cheap Pen'), left: '273px', top: '120px' },
    { item: penItems.find((pen) => pen.name === 'Multi Pen'), left: '273px', top: '534px' },
  ]
  const [selectedPen, setSelectedPen] = useState(penCards[0].item)

  return (
    <>
      <div style={{ width: '50px', height: '207px', position: 'absolute', left: '10px', top: '675px' }}>
        <img
          src={images.PencilPen}
          style={{ width: '198px', height: '50px', position: 'absolute', left: '50%', top: '50%', maxWidth: 'none', transform: 'translate(-50%, -50%) rotate(-90deg)' }}
          alt="pencil_pen"
        />
      </div>
      {penCards.map(({ item, left, top }) => (
        <button
          key={item.name}
          type="button"
          aria-label={`Select ${item.name}, S ${item.price}`}
          aria-pressed={selectedPen.name === item.name}
          onClick={() => setSelectedPen(item)}
          style={{ width: '106px', height: '122px', position: 'absolute', left, top, padding: 0, border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
        >
          <img
            src={images.PenPurchaseFrame}
            style={{ width: '106px', height: '122px', position: 'absolute', left: '0px', top: '0px', maxWidth: 'none' }}
            alt=""
          />
          <span style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '24px', lineHeight: '32px', width: '85px', height: '26px', position: 'absolute', left: '17px', top: '91px' }}>
            S {item.price}
          </span>
          <span style={{ opacity: ownedPens.has(item.name) ? 1 : 0.5, width: '106px', height: '90px', position: 'absolute', left: 0, top: 0, display: 'block' }}>
            <img
              src={item.image}
              style={{ width: '102px', height: '26px', position: 'absolute', left: '50%', top: '50%', maxWidth: 'none', transform: 'translate(-50%, -50%) rotate(-45deg)', transformOrigin: 'center', filter: selectedPen.name === item.name ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))' : 'none' }}
              alt={item.name}
            />
          </span>
        </button>
      ))}
      <p aria-live="polite" style={{ color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '48px', lineHeight: '1', width: '146px', height: '26px', position: 'absolute', left: '250px', top: '705px' }}>
        S {selectedPen.price}
      </p>
      {ownedPens.has(selectedPen.name) ? (
        <img
          src={images.BoughtLabel}
          style={{ width: '360px', height: '180px', position: 'absolute', left: '26px', top: '677px', maxWidth: 'none', zIndex: 2 }}
          alt="Pen already bought"
        />
      ) : (
        <button
          type="button"
          aria-label={`Buy ${selectedPen.name} for S ${selectedPen.price}`}
          onClick={() => onBuyPen(selectedPen)}
          style={{ width: '167px', height: '102px', position: 'absolute', right: '-1px', bottom: '-2px', padding: 0, border: 0, background: 'transparent', cursor: 'pointer', zIndex: 2 }}
        >
          <img src={images.BuyButton} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="" />
        </button>
      )}
      <div style={{ color: '#000', fontFamily: "'Intel One Mono', monospace", fontSize: '40px', lineHeight: 1, width: '155px', height: '182px', position: 'absolute', left: '70px', top: '691px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', placeItems: 'center' }}>
        {Array.from({ length: 9 }, (_, index) => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
    </>
  )
}

function PacksContent() {
  return (
    <>
      <img
        src={images.Packstabbackground}
        style={{ width: "438px", height: "591px", position: "absolute", left: "-12px", top: "87px", maxWidth: "none" }}
        alt="PacksTabBackground"
      />
      <img
        src={images.BoughtLabel}
        style={{ width: "360px", height: "180px", position: "absolute", left: "26px", top: "677px", maxWidth: "none" }}
        alt="BoughtLabel"
      />
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
    </>
  )
}

function CurrencyContent() {
  return (
    <>
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
    </>
  )
}
