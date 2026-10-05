import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function BoardCreatorPage() {
  return (
    <div style={{backgroundColor: '#fff', width: '100%', maxWidth: '390px', aspectRatio: '390 / 844', position: 'relative', overflow: 'hidden', margin: '0 auto',}}>

      <img
        src={images.BgDesk}
        style={{ width: '1268px', height: '881px', position: 'absolute', left: '-409px', top: '-1px' }}
        alt="BGDeco"
      />
      <img
        src={images.Board6x6}
        style={{ width: '366px', height: '362px', position: 'absolute', left: '18px', top: '482px' }}
        alt="Board6x6"
      />
      <img
        src={images.Board9x9}
        style={{ width: '366px', height: '362px', position: 'absolute', left: '18px', top: '482px' }}
        alt="Board9x9"
      />
      <Link
        to="/"
        aria-label="Return to home page"
        style={{ width: '67px', height: '69px', position: 'absolute', left: '7px', top: '8px', display: 'block', zIndex: 10 }}
      >
        <img
          src={images.Mainmenubutton}
          style={{ width: '100%', height: '100%', maxWidth: 'none' }}
          alt="MainMenuButton"
        />
      </Link>
      <p style={{ color: '#000', fontFamily: 'Piedra', fontSize: '40px', width: '100%', height: '52px', position: 'absolute', left: '35px', top: '45px', letterSpacing: '0.08em' }}>
        Capacity 00/30
      </p>
      <div style={{ width: '100%', height: '555px', position: 'absolute', left: '0.5px', top: '108px' }}>
        <img
          src={images.CreateBoard}
          style={{ width: '100%', height: '555px', position: 'absolute', left: '0', top: '0', maxWidth: 'none' }}
          alt="Background"
        />
        {/* size selectors*/}
        <div style={{ opacity: 0.4, backgroundColor: '#06FFbc', width: '86px', height: '21px', position: 'absolute', left: '57px', top: '189px' }}></div>
        <div style={{ opacity: 0.4, backgroundColor: '#06FFbc', width: '86px', height: '21px', position: 'absolute', left: '57px', top: '210px' }}></div>

        {/* difficulty selectors */}
        <div style={{ opacity: 0.4, backgroundColor: '#06FF', width: '94px', height: '21px', position: 'absolute', left: '188px', top: '187px' }}></div>
        <div style={{ opacity: 0.4, backgroundColor: '#06FF', width: '111px', height: '21px', position: 'absolute', left: '187px', top: '250px' }}></div>
        <div style={{ opacity: 0.4, backgroundColor: '#06FF', width: '116px', height: '21px', position: 'absolute', left: '188px', top: '209px' }}></div>
        <div style={{ opacity: 0.4, backgroundColor: '#06FF', width: '128px', height: '21px', position: 'absolute', left: '187px', top: '271px' }}></div>
        <div style={{ opacity: 0.4, backgroundColor: '#06FF', width: '86px', height: '21px', position: 'absolute', left: '188px', top: '229px' }}></div>
       
        {/* type selectors */}
        <div style={{ opacity: 0.4, backgroundColor:'#06FFFF', width:'105px', height:'21px', position:'absolute', left:'79px', top:'387px' }}></div>
        <div style={{ opacity: 0.4, backgroundColor:'#06FFFF', width:'105px', height:'21px', position:'absolute', left:'79px', top:'408px' }}></div>
        <div style={{ opacity: 0.4, backgroundColor:'#06FFFF', width:'105px', height:'21px', position:'absolute', left:'79px', top:'429px' }}></div>
      
        {/* create button */}
        <Link to="/board" aria-label="Create board" style={{ opacity: 0.4, backgroundColor:'#06FFFF', width:'167px', height:'44px', position:'absolute', left:'216px', top:'367px', display: 'block' }} />

      </div>
    </div>
  );
}
