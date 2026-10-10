import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProfile } from './profileStore.js'
import { boardName, listBoards, openBoard, deleteBoard } from './boardStore.js'
import * as images from './figmages/index.js'
import playTriangle from './figmages/PlayTriangle.svg'

const MAX_BOARDS = 30
const MAX_FRIEND_BOARDS = 10

function ReserveBoard({ board, image, selected, onSelect, onOpen }) {
  return <div data-reserve-board={board.id} style={{ position: 'relative', width: '74px', height: '71px', flexShrink: 0 }}>
    <button type="button" aria-label={boardName(board)} aria-pressed={selected} onClick={() => selected ? onOpen(board) : onSelect(board.id)} style={{ width: '100%', height: '100%', padding: 0, border: 0, background: 'transparent', cursor: 'pointer' }}>
      <img src={image} alt="" draggable={false} style={{ width: '100%', height: '100%', display: 'block' }} />
    </button>
    {selected && <button type="button" aria-label={`Open ${boardName(board)}`} onClick={() => onOpen(board)} style={{ position: 'absolute', left: '15px', top: '13px', width: '44px', height: '44px', border: 0, background: 'transparent', cursor: 'pointer', padding: 0 }}><img src={playTriangle} alt="" style={{ width: '100%', height: '100%', display: 'block' }} /></button>}
  </div>
}

export default function PuzzleReserve() {
  const profile = useProfile()
  const navigate = useNavigate()
  const [boards, setBoards] = useState(() => listBoards(profile))
  const [selectedId, setSelectedId] = useState(null)
  const [error, setError] = useState('')
  const selected = boards.find((board) => board.id === selectedId)
  const visibleBoards = boards.filter((board) => !board.archived && board.createdBy.username === profile.username).slice(0, MAX_BOARDS)
  const visibleFriendBoards = boards.filter((board) => !board.archived && board.createdBy.username !== profile.username).slice(0, MAX_FRIEND_BOARDS)
  const archivedBoards = boards.filter((board) => board.archived)
  const removeSelected = () => {
    if (!selected) return
    try {
      deleteBoard(selected.id, profile)
      setBoards((current) => current.filter((board) => board.id !== selected.id))
      setSelectedId(null)
      setError('')
    } catch (failure) { setError(failure.message) }
  }
  const play = (board) => {
    openBoard(board, profile)
    navigate(!board.archived && (board.completedAt || board.failedAt || board.livesUsed >= 5) ? `/results/${board.id}` : '/board')
  }
  useEffect(() => {
    const deselect = (event) => {
      if (!event.target.closest?.('[data-reserve-board], [data-reserve-trash]')) setSelectedId(null)
    }
    document.addEventListener('pointerdown', deselect)
    return () => document.removeEventListener('pointerdown', deselect)
  }, [])
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
      <button type="button" data-reserve-trash aria-label="Delete selected board" disabled={!selected} onClick={removeSelected} style={{ width: '74px', height: '84px', position: 'absolute', left: '318px', top: '767px', padding: 0, border: 0, background: 'transparent', cursor: selected ? 'pointer' : 'default', zIndex: 10 }}>
        <img src={images.Trash} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
      </button>
      {error && <p role="alert" style={{ position: 'absolute', left: '10px', top: '765px', width: '290px', color: '#000', fontFamily: 'var(--font-piedra)' }}>{error}</p>}
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
      <div role="region" aria-label="Archived boards" style={{ position: 'absolute', left: '297px', top: '330px', width: '83px', height: '429px', overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {archivedBoards.map((board) => <ReserveBoard key={board.id} board={board} image={images.Puzzlearchivetemplate} selected={selectedId === board.id} onSelect={setSelectedId} onOpen={play} />)}
        </div>
      </div>
      {selected && <p role="status" style={{ position: 'absolute', left: 0, top: '221px', width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '30px', lineHeight: '36px', textAlign: 'center' }}>{boardName(selected)}</p>}
      <div
        className="saved-boards-scroll"
        role="region"
        aria-label="Saved boards, maximum 30"
        tabIndex={0}
        style={{ width: '283px', height: '353px', position: 'absolute', left: -5, top: '280px', overflowY: 'auto', overflowX: 'hidden', overscrollBehaviorY: 'contain', boxSizing: 'border-box' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 74px)', columnGap: '20.5px', rowGap: '8px', padding: '10px 9px', width: 'fit-content' }}>
          {visibleBoards.map((board) => <ReserveBoard key={board.id} board={board} image={images.Puzzleselecttemplate} selected={selectedId === board.id} onSelect={setSelectedId} onOpen={play} />)}
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
          {visibleFriendBoards.map((board) => <ReserveBoard key={board.id} board={board} image={images.FriendPuzzleTemplate} selected={selectedId === board.id} onSelect={setSelectedId} onOpen={play} />)}
        </div>
      </div>
    </div>
  );
}
