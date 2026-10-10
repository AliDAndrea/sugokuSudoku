import { Link } from 'react-router-dom'
import './App.css'
import { mainPen, penItems } from './PenItem.jsx'
import { useProfile } from './profileStore.js'

// Import All Images
import * as images from './figmages/index.js'

export default function HomePage() {
  const profile = useProfile()
  const selectedPen = penItems.find((pen) => pen.name === profile.selectedPen) || mainPen

  return (
    <div style={{backgroundColor: '#fff', width: '100%', maxWidth: '390px', aspectRatio: '390 / 844', position: 'relative', overflow: 'hidden', margin: '0 auto',}}>
      <img
        src={images.BgHome}
        alt="Home background"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      <Link
        to="/board-creator"
        aria-label="Open board creator"
        style={{width: '400px',height: '100px',position: 'absolute',left: '50%',top: '475px',transform: 'translateX(-50%)',}}>
        <img
          src={selectedPen.image}
          style={{ width: '400px', height: '100px', position: 'absolute', left: '0', top: '5px', maxWidth: 'none' }}
          alt={selectedPen.name}
        />
        <span style={{ color: '#000', WebkitTextStroke: '.5px white', fontFamily: 'Piedra', fontSize: '40px', position: 'absolute', left: '37%', top: '44px', letterSpacing: '0.07em', zIndex: 1 }}>
          Create
        </span>
      </Link>
      <Link
        to="/profile"
        aria-label="Open profile"
        style={{ width: '50px', height: '50px', position: 'absolute', right: '8px', top: '8px', borderRadius: '50%', backgroundColor: '#F8F3F2', border: '2px solid #000', boxSizing: 'border-box', display: 'block', zIndex: 10 }}
      >
        {profile.profileImage && <img src={profile.profileImage} alt={`${profile.username}'s profile`} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} />}
      </Link>
      <Link
        to="/puzzle-reserve"
        aria-label="Open puzzle reserve"
        style={{ width: '539px', height: '252px', position: 'absolute', left: '-65px', top: '622px', display: 'block' }}
      >
        <img
          src={images.Puzzledesk}
          style={{ height: '100%', width: '100%', maxWidth: 'none' }}
          alt="PuzzleDesk"
        />
      </Link>
      <img
        src={images.Levelprogressbar}
        style={{ width: '133px', height: '97px', position: 'absolute', left: '-35px', top: '676px' }}
        alt="LevelProgressBar"
      />
      <Link
        to="/shop"
        aria-label="Open pen shop"
        style={{ width: '228px', height: '155px', position: 'absolute', left: '286px', top: '299px', display: 'block' }}
      >
        <img
          src={images.Shopdesk}
          style={{ width: '100%', height: '100%' }}
          alt="ShopDesk"
        />
      </Link>
      <img
        src={images.Shopsign}
        style={{ width: '81px', height: '83px', position: 'absolute', left: '320px', top: '187px' }}
        alt="ShopSign"
      />
      <Link
        to="/friends"
        aria-label="Open friends page"
        style={{ width: '173px', height: '234px', position: 'absolute', left: '-35px', top: '210px' }}
      >
        <img
          src={images.Friends}
          style={{ height: '100%', width: '100%', maxWidth: 'none' }}
          alt="Friends"
        />
      </Link>
      {/*hint*/}
      <p style={{ color: '#000', fontFamily: 'Piedra', fontSize: '22px', width: '31px', height: '29px', position: 'absolute', left: '358px', top: '723px', letterSpacing: '0.07em' }}>
        ##
      </p>
      {/* lvl */}
      <p style={{ color: '#000', fontFamily: 'Piedra', fontSize: '22px', width: '31px', height: '29px', position: 'absolute', left: '52px', top: '655px', letterSpacing: '0.07em' }}>
        ##
      </p>
      <p style={{ color: '#000', fontFamily: 'Piedra', fontSize: '22px', width: '31px', height: '29px', position: 'absolute', left: '328px', top: '672px', letterSpacing: '0.07em' }}>
        ##
      </p>
    </div>
  );
}
