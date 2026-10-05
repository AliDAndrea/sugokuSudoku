import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

export default function PuzzleReserve() {
  return (
    <div className="bg-[#FFF] min-w-screen min-h-screen overflow-hidden">
      <img
        src={images.BgMyPuzzles}
        className="w-[1511px] h-[1050px] absolute -left-[545px] -top-2 max-w-none"
        alt="Deco2"
      />
      <img
        src={images.BgPuzzlesDrawer}
        className="w-[416px] h-full absolute -left-[7px] top-[9px] max-w-none"
        alt="Deco1"
      />
      <Link
        to="/"
        aria-label="Return to home page"
        className="w-[50px] h-[34px] absolute left-44 top-[833px] block z-10"
      >
        <img
          src={images.Mainmenubutton}
          className="w-full h-full max-w-none"
          alt="MainMenuButton"
        />
      </Link>
      <img
        src={images.Trash}
        className="w-[74px] h-[84px] absolute left-[326px] top-[796px] max-w-none"
        alt="Trash"
      />
      <img
        src={images.ArchiveChallengePacksBackground}
        className="w-[1261px] h-[534px] absolute -left-[842px] top-[278px] max-w-none"
        alt="ArchiveChallengePacksBackground"
      />
      <img
        src={images.ChallangePackTemplate}
        className="w-[73px] h-[72px] absolute left-[13px] top-[706px] max-w-none"
        alt="ChallangePackTemplate"
      />
      <img
        src={images.ChallangePackTemplate}
        className="w-[73px] h-[72px] absolute left-[103px] top-[706px] max-w-none"
        alt="ChallangePackTemplate"
      />
      <img
        src={images.ChallangePackTemplate}
        className="w-[73px] h-[72px] absolute left-[193px] top-[706px] max-w-none"
        alt="ChallangePackTemplate"
      />
      <img
        src={images.ChallangePacksLabel}
        className="w-64 h-[46px] absolute left-7 top-[651px] max-w-none"
        alt="ChallangePacksLabel"
      />
      <img
        src={images.Puzzlearchivetemplate}
        className="w-[75px] h-[71px] absolute left-[312px] top-[342px] max-w-none"
        alt="PuzzleArchiveTemplate"
      />
      <img
        src={images.Puzzlearchivetemplate}
        className="w-[75px] h-[71px] absolute left-[312px] top-[428px] max-w-none"
        alt="PuzzleArchiveTemplate"
      />
      <img
        src={images.Puzzlearchivetemplate}
        className="w-[75px] h-[71px] absolute left-[312px] top-[514px] max-w-none"
        alt="PuzzleArchiveTemplate"
      />
      <img
        src={images.Puzzlearchivetemplate}
        className="w-[75px] h-[71px] absolute left-[312px] top-[600px] max-w-none"
        alt="PuzzleArchiveTemplate"
      />
      <img
        src={images.Puzzlearchivetemplate}
        className="w-[75px] h-[71px] absolute left-[312px] top-[686px] max-w-none"
        alt="PuzzleArchiveTemplate"
      />
      <div className="w-[293px] h-[365px] absolute left-0 top-[292px] overflow-hidden">
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[9px] top-2.5 max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[9px] top-[89px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[9px] top-[168px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[9px] top-[247px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[9px] top-[326px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[104px] top-2.5 max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[104px] top-[89px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[104px] top-[168px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[104px] top-[247px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[104px] top-[326px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[198px] top-2.5 max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[198px] top-[89px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[198px] top-[168px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[198px] top-[247px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
        <img
          src={images.Puzzleselecttemplate}
          className="w-[74px] h-[71px] absolute left-[198px] top-[326px] max-w-none"
          alt="PuzzleSelectTemplate"
        />
      </div>
      <img
        src={images.BgFriend}
        className="w-[337px] h-[174px] absolute left-[31px] top-[26px] max-w-none"
        alt="friendBg"
      />
      <div className="inline-flex pt-[50px] pr-0 pb-[22px] pl-2.5 justify-end items-start gap-3 w-[310px] h-[143px] absolute left-11 top-[41px] overflow-hidden">
        <img
          src={images.FriendPuzzleTemplate}
          className="w-[71px] h-[71px] absolute left-2.5 top-[50px] max-w-none"
          alt="FriendPuzzleTemplate"
        />
        <img
          src={images.FriendPuzzleTemplate}
          className="w-[71px] h-[71px] absolute left-[93px] top-[50px] max-w-none"
          alt="FriendPuzzleTemplate"
        />
        <img
          src={images.FriendPuzzleTemplate}
          className="w-[71px] h-[71px] absolute left-44 top-[50px] max-w-none"
          alt="FriendPuzzleTemplate"
        />
        <img
          src={images.FriendPuzzleTemplate}
          className="w-[71px] h-[71px] absolute left-[259px] top-[50px] max-w-none"
          alt="FriendPuzzleTemplate"
        />
      </div>
    </div>
  );
}

