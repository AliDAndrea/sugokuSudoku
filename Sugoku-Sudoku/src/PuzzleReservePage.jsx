import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'

const MAX_BOARDS = 30
const MAX_FRIEND_BOARDS = 10
const defaultFriendBoards = Array.from({ length: MAX_FRIEND_BOARDS }, (_, index) => ({ id: index + 1 }))
const defaultBoards = Array.from({ length: MAX_BOARDS }, (_, index) => ({ id: index + 1 }))

export default function PuzzleReserve({ boards = defaultBoards, friendBoards = defaultFriendBoards }) {
  const visibleBoards = boards.slice(0, MAX_BOARDS)
  const visibleFriendBoards = friendBoards.slice(0, MAX_FRIEND_BOARDS)
  return (
    <div style={{backgroundColor: '#fff', width: '100%', maxWidth: '390px', aspectRatio: '390 / 844', position: 'relative', overflow: 'hidden', margin: '0 auto',}}>
      <img
        src={images.BgMyPuzzles}
        style={{ width: '1511px', height: '1050px', position: 'absolute', left: '-545px', top: '-2px', maxWidth: 'none' }}
        alt="Deco2"
      />
      <img
        src={images.BgPuzzlesDrawer}
        style={{ width: '416px', height: '100%', position: 'absolute', left: '-7px', top: '9px', maxWidth: 'none' }}
        alt="Deco1"
      />
      <Link
        to="/"
        aria-label="Return to home page"
        style={{ width: '50px', height: '34px', position: 'absolute', left: '176px', top: '800px', display: 'block', zIndex: 10 }}
      >
        <img
          src={images.MainmenuArrow}
          style={{ width: '100%', height: '100%', maxWidth: 'none' }}
          alt="MainMenuButton"
        />
      </Link>
      <img
        src={images.Trash}
        style={{ width: '74px', height: '84px', position: 'absolute', left: '318px', top: '767px', maxWidth: 'none' }}
        alt="Trash"
      />
      <div
        aria-hidden="true"
        style={{
          width: '416px',
          height: '100%',
          position: 'absolute',
          left: '-7px',
          top: '9px',
          maskImage: `url(${images.BgPuzzlesDrawer})`,
          maskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url(${images.BgPuzzlesDrawer})`,
          WebkitMaskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <img
          src={images.ArchiveChallengePacksBackground}
          style={{ width: '1261px', height: '515px', position: 'absolute', left: '-848px', top: '259px', maxWidth: 'none' }}
          alt=""
        />
      </div>
      <img
        src={images.ChallangePackTemplate}
        style={{ width: '73px', height: '72px', position: 'absolute', left: '13px', top: '683px', maxWidth: 'none' }}
        alt="ChallangePackTemplate"
      />
      <img
        src={images.ChallangePackTemplate}
        style={{ width: '73px', height: '72px', position: 'absolute', left: '103px', top: '683px', maxWidth: 'none' }}
        alt="ChallangePackTemplate"
      />
      <img
        src={images.ChallangePackTemplate}
        style={{ width: '73px', height: '72px', position: 'absolute', left: '193px', top: '683px', maxWidth: 'none' }}
        alt="ChallangePackTemplate"
      />
      <img
        src={images.ChallangePacksLabel}
        style={{ width: '256px', height: '46px', position: 'absolute', left: '28px', top: '625px', maxWidth: 'none' }}
        alt="ChallangePacksLabel"
      />
      <img
        src={images.Puzzlearchivetemplate}
        style={{ width: '75px', height: '71px', position: 'absolute', left: '300px', top: '330px', maxWidth: 'none' }}
        alt="PuzzleArchiveTemplate"
      />
      <img
        src={images.Puzzlearchivetemplate}
        style={{ width: '75px', height: '71px', position: 'absolute', left: '300px', top: '416px', maxWidth: 'none' }}
        alt="PuzzleArchiveTemplate"
      />
      <img
        src={images.Puzzlearchivetemplate}
        style={{ width: '75px', height: '71px', position: 'absolute', left: '300px', top: '502px', maxWidth: 'none' }}
        alt="PuzzleArchiveTemplate"
      />
      <img
        src={images.Puzzlearchivetemplate}
        style={{ width: '75px', height: '71px', position: 'absolute', left: '300px', top: '588px', maxWidth: 'none' }}
        alt="PuzzleArchiveTemplate"
      />
      <img
        src={images.Puzzlearchivetemplate}
        style={{ width: '75px', height: '71px', position: 'absolute', left: '300px', top: '674px', maxWidth: 'none' }}
        alt="PuzzleArchiveTemplate"
      />
      <div
        className="saved-boards-scroll"
        role="region"
        aria-label="Saved boards, maximum 30"
        tabIndex={0}
        style={{ width: '283px', height: '353px', position: 'absolute', left: -5, top: '280px', overflowY: 'auto', overflowX: 'hidden', overscrollBehaviorY: 'contain', boxSizing: 'border-box' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 74px)', columnGap: '20.5px', rowGap: '8px', padding: '10px 9px', width: 'fit-content' }}>
          {visibleBoards.map((board, index) => (
            <img
              key={board.id ?? index}
              src={images.Puzzleselecttemplate}
              style={{ width: '74px', height: '71px', display: 'block', maxWidth: 'none' }}
              alt={`Board ${index + 1}`}
              draggable={false}
            />
          ))}
        </div>
      </div>
      <img
        src={images.BgFriend}
        style={{ width: '337px', height: '174px', position: 'absolute', left: '31px', top: '26px', maxWidth: 'none' }}
        alt="friendBg"
      />
      <div
        className="friend-boards-scroll"
        role="region"
        aria-label="Friends' puzzles, maximum 10 boards"
        tabIndex={0}
        style={{ width: '310px', height: '93px', position: 'absolute', left: '44px', top: '91px', overflowX: 'auto', overflowY: 'hidden', overscrollBehaviorX: 'contain', boxSizing: 'border-box' }}
      >
        <div style={{ display: 'flex', gap: '12px', padding: '0 10px 8px', width: 'max-content' }}>
          {visibleFriendBoards.map((board, index) => (
            <img
              key={board.id ?? index}
              src={images.FriendPuzzleTemplate}
              style={{ width: '71px', height: '71px', display: 'block', flexShrink: 0, maxWidth: 'none' }}
              alt={`Friend's board ${index + 1}`}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
