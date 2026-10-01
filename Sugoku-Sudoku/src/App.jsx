import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

// Import All Images
import BgHome from './figmages/BgHome.png'
import MultiPen from './figmages/Multi_pen.png'
import ArchiveBackground from './figmages/ArchiveBackground.png'
import ArchiveButton from './figmages/ArchiveButton.png'
import ArchiveChallengePacksBackground from './figmages/ArchiveChallengePacksBackground.png'
import Arrowleft from './figmages/Arrowleft.png'
import Arrowright from './figmages/Arrowright.png'
import BackButton from './figmages/BackButton.png'
import BgDesk from './figmages/BgDesk.png'
import BgFriend from './figmages/BgFriend.png'
import BgFriends from './figmages/BgFriends.png'
import BgInvitePage from './figmages/BgInvitePage.png'
import BgMyPuzzles from './figmages/BgMyPuzzles.png'
import BgPuzzlesDrawer from './figmages/BgPuzzlesDrawer.png'
import BgSettings from './figmages/BgSettings.png'
import BgShop from './figmages/BgShop.png'
import Board3x3 from './figmages/Board3x3.png'
import Board6x6 from './figmages/Board6x6.png'
import Board9x9 from './figmages/Board9x9.png'
import BoughtLabel from './figmages/BoughtLabel.png'
import BrushPen from './figmages/Brush_pen.png'
import BuyButton from './figmages/BuyButton.png'
import ChallangePacksLabel from './figmages/ChallangePacksLabel.png'
import ChallangePackTemplate from './figmages/ChallangePackTemplate.png'
import ChangeEmail from './figmages/ChangeEmail.png'
import ChangePassword from './figmages/ChangePassword.png'
import CheapPen from './figmages/Cheap_pen.png'
import ConfirmButton from './figmages/ConfirmButton.png'
import CrayonPen from './figmages/Crayon_pen.png'
import CreateBoard from './figmages/CreateBoard.png'
import CurrencyTab from './figmages/CurrencyTab.png'
import FindFriends from './figmages/FindFriends.png'
import FriendRequests from './figmages/FriendRequests.png'
import Friends from './figmages/Friends.png'
import FriendsPage from './figmages/FriendsPage.png'
import HintDisplay from './figmages/HintDisplay.png'
import HintPurchaseFrame from './figmages/HintPurchaseFrame.png'
import HintsLabel from './figmages/HintsLabel.png'
import InkPen from './figmages/Ink_pen.png'
import InviteButton from './figmages/InviteButton.png'
import LevelBoard from './figmages/LevelBoard.png'
import Levelprogressbar from './figmages/Levelprogressbar.png'
import LifeHeart from './figmages/LifeHeart.png'
import Lockedboard from './figmages/Lockedboard.png'
import MainmenuArrow from './figmages/MainmenuArrow.png'
import Mainmenubutton from './figmages/Mainmenubutton.png'
import MarkerPen from './figmages/Marker_pen.png'
import MechPen from './figmages/Mech_pen.png'
import Packstab from './figmages/Packstab.png'
import Packstabbackground from './figmages/Packstabbackground.png'
import PenPurchaseFrame from './figmages/PenPurchaseFrame.png'
import Penstab from './figmages/Penstab.png'
import PencilPen from './figmages/Pencil_pen.png'
import PenPen from './figmages/Pen_pen.png'
import PhoneButton from './figmages/PhoneButton.png'
import Profile from './figmages/Profile.png'
import Puzzlearchivetemplate from './figmages/Puzzlearchivetemplate.png'
import Puzzledesk from './figmages/Puzzledesk.png'
import Puzzleselecttemplate from './figmages/Puzzleselecttemplate.png'
import QuillPen from './figmages/Quill_pen.png'
import Results from './figmages/Results.png'
import Select1 from './figmages/Select1.png'
import Select2 from './figmages/Select2.png'
import Select3 from './figmages/Select3.png'
import Select4 from './figmages/Select4.png'
import Select5 from './figmages/Select5.png'
import Select6 from './figmages/Select6.png'
import Select7 from './figmages/Select7.png'
import Select8 from './figmages/Select8.png'
import Select9 from './figmages/Select9.png'
import Shopdesk from './figmages/Shopdesk.png'
import Shopsign from './figmages/Shopsign.png'
import StylusPen from './figmages/Stylus_pen.png'
import SudoLabel from './figmages/SudoLabel.png'
import SudoPurchaseFrame from './figmages/SudoPurchaseFrame.png'
import Takenote from './figmages/Takenote.png'
import Trash from './figmages/Trash.png'
import YatatePen from './figmages/Yatate_pen.png'

export default function Homebase() {
  return (
    <div className="bg-[#FFF] min-w-screen min-h-screen overflow-hidden">
      <img
        src={BgHome}
        className="w-full h-full absolute left-0 top-0 max-w-none"
        alt="bgDeco"
      />
      <div className="w-[92px] h-[352px] absolute left-[380px] top-[515px]">
        <img
          src={MultiPen}
          className="w-[87px] h-[343px] absolute -left-0 top-[5px] max-w-none"
          alt="multi_pen"
        />
        <img
          src={CrayonPen}
          className="w-[87px] h-[343px] absolute -left-0 top-[5px] max-w-none"
          alt="crayon_pen"
        />
        <img
          src={BrushPen}
          className="w-[87px] h-[343px] absolute -left-0 top-[5px] max-w-none"
          alt="brush_pen"
        />
        <img
          src={MarkerPen}
          className="w-[87px] h-[343px] absolute -left-[9px] top-0 max-w-none"
          alt="marker_pen"
        />
        <img
          src={PenPen}
          className="w-[87px] h-[343px] absolute left-0 top-0 max-w-none"
          alt="pen_pen"
        />
        <img
          src={InkPen}
          className="w-[87px] h-[343px] absolute -left-[3px] top-[5px] max-w-none"
          alt="ink_pen"
        />
        <img
          src={CheapPen}
          className="w-[87px] h-[343px] absolute -left-0 top-[5px] max-w-none"
          alt="cheap_pen"
        />
        <img
          src={QuillPen}
          className="w-[87px] h-[344px] absolute -left-0 top-[5px] max-w-none"
          alt="quill_pen"
        />
        <img
          src={MechPen}
          className="w-[87px] h-[343px] absolute -left-0 top-[5px] max-w-none"
          alt="mech_pen"
        />
        <img
          src={YatatePen}
          className="w-[87px] h-[343px] absolute -left-0 top-[5px] max-w-none"
          alt="yatate_pen"
        />
        <img
          src={StylusPen}
          className="w-[87px] h-[343px] absolute -left-0 top-[5px] max-w-none"
          alt="stylus_pen"
        />
        <img
          src={PencilPen}
          className="w-[87px] h-[343px] absolute -left-0 top-[5px] max-w-none"
          alt="pencil_pen"
        />
      </div>
      <div className="w-[50px] h-[51px] absolute left-[343px] top-2"></div>
      <img
        src={Puzzledesk}
        className="w-[539px] h-[252px] absolute -left-[65px] top-[622px] max-w-none"
        alt="PuzzleDesk"
      />
      <img
        src={Levelprogressbar}
        className="w-[133px] h-[97px] absolute -left-[35px] top-[676px] max-w-none"
        alt="LevelProgressBar"
      />
      <img
        src={Shopdesk}
        className="w-[228px] h-[155px] absolute left-[300px] top-[310px] max-w-none"
        alt="ShopDesk"
      />
      <img
        src={Shopsign}
        className="w-[81px] h-[83px] absolute left-[329px] top-[193px] max-w-none"
        alt="ShopSign"
      />
      <img
        src={Friends}
        className="w-[173px] h-[234px] absolute -left-[35px] top-[210px] max-w-none"
        alt="Friends"
      />
      <p className="text-[#000] font-piedra text-[22px] w-[31px] h-[29px] absolute left-[363px] top-[723px] tracking-[0.07em]">
        ##
      </p>
      <p className="text-[#000] font-piedra text-[22px] w-[31px] h-[29px] absolute left-[52px] top-[653px] tracking-[0.07em]">
        ##
      </p>
      <p className="text-[#000] font-piedra text-xl w-[31px] h-[26px] absolute left-[329px] top-[672px] tracking-[0.07em]">
        ##
      </p>
    </div>
  );
}