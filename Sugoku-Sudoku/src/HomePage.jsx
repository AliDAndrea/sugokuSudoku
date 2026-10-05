import { Link } from 'react-router-dom'
import './App.css'
import { mainPen } from './PenItem.jsx'

// Import All Images
import * as images from './figmages/index.js'

export default function HomePage() {
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
          src={mainPen.image}
          style={{ width: '400px', height: '100px', position: 'absolute', left: '0', top: '5px', maxWidth: 'none' }}
          alt={mainPen.name}
        />
        <span style={{ color: '#000', WebkitTextStroke: '.5px white', fontFamily: 'Piedra', fontSize: '40px', position: 'absolute', left: '37%', top: '40px', letterSpacing: '0.07em', zIndex: 1 }}>
          Create
        </span>
      </Link>
      <div style={{ width: '50px', height: '51px', position: 'absolute', left: '343px', top: '8px' }}></div>
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
      <img
        src={images.Shopdesk}
        style={{ width: '228px', height: '155px', position: 'absolute', left: '300px', top: '310px' }}
        alt="ShopDesk"
      />
      <img
        src={images.Shopsign}
        style={{ width: '81px', height: '83px', position: 'absolute', left: '329px', top: '193px' }}
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
      <p style={{ color: '#000', fontFamily: 'Piedra', fontSize: '22px', width: '31px', height: '29px', position: 'absolute', left: '363px', top: '723px', letterSpacing: '0.07em' }}>
        ##
      </p>
      <p style={{ color: '#000', fontFamily: 'Piedra', fontSize: '22px', width: '31px', height: '29px', position: 'absolute', left: '52px', top: '653px', letterSpacing: '0.07em' }}>
        ##
      </p>
      <p style={{ color: '#000', fontFamily: 'Piedra', fontSize: '22px', width: '31px', height: '29px', position: 'absolute', left: '329px', top: '672px', letterSpacing: '0.07em' }}>
        ##
      </p>
    </div>
  );
}
