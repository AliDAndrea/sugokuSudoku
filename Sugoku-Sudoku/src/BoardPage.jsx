import { ChaosBoardArtwork } from './ChaosBoardArtwork.jsx'
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as images from './figmages/index.js'
import { mainPen, penItems } from './PenItem.jsx'
import { useProfile } from './profileStore.js'
import { boardReducer, createBoardState, isRelatedCell, isNumberComplete, MAX_BOARD_PLAYERS, userColors } from './boardState.js'
import { getBoard, inviteFriendToBoard, loadBoard, saveBoard } from './boardStore.js'
import './BoardPage.css'
import { boardGeometry } from './boardGeometry.js'

const tileLayouts = Object.fromEntries(Object.entries(boardGeometry).map(([size, geometry]) => [size,
  geometry.cells.map((cell) => ({
    left: `${cell.x / geometry.width * 100}%`,
    top: `${cell.y / geometry.height * 400}px`,
    width: `${cell.width / geometry.width * 100}%`,
    height: `${cell.height / geometry.height * 400}px`,
    '--tile-mask': `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cell.width} ${cell.height}" preserveAspectRatio="none"><defs><filter id="soft"><feGaussianBlur stdDeviation="0.4"/></filter></defs><path fill="white" filter="url(#soft)" d="${cell.path}"/></svg>`)}")`,
  })),
]))

const boardPenStyle = {
  width: '158px',
  height: '40px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  maxWidth: 'none',
  transform: 'translate(-50%, -50%) rotate(270deg)',
}
function LifeHeart({ index, lost }) {
  const [lostOnLoad] = useState(lost)
  return <img src={images.LifeHeart} className="board-life" data-lost={lost} data-animate={lost && !lostOnLoad} aria-hidden={lost} alt={`Life ${index + 1}`} style={{ width: '38px', height: '35px', position: 'absolute', left: `${10 + index * 49}px`, top: '113px', maxWidth: 'none' }} />
}

function ColorCircle({ color }) {
  return <svg viewBox="0 0 60 60" aria-hidden="true">
    <path d="M30 4 C44 3 55 15 55 29 C57 44 44 56 30 55 C15 57 4 44 5 30 C3 16 15 3 30 4 Z" fill={color} stroke="#000" strokeWidth="4" strokeLinejoin="round" />
    <path d="M29 5 C43 2 57 17 54 31 C56 45 42 57 28 54 C13 55 3 42 6 28 C4 14 17 3 29 5 Z" fill="none" stroke="#000" strokeWidth="1.4" />
  </svg>
}

function BoardParticipant({ user, color }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const text = ref.current
    let active = true
    const fit = () => {
      if (!active) return
      text.style.fontSize = '10px'
      const width = text.getBoundingClientRect().width
      const available = text.parentElement.clientWidth - 12
      if (width > available) text.style.fontSize = `${10 * available / width}px`
    }
    fit()
    document.fonts.ready.then(fit)
    const observer = new ResizeObserver(fit)
    observer.observe(text.parentElement)
    return () => { active = false; observer.disconnect() }
  }, [user.username])
  return <span className="board-participant" style={{ backgroundColor: color }} title={user.username}><span ref={ref}>{user.username}</span></span>
}

function BoardInviteMenu({ board, profile, onUpdate, onClose }) {
  const dialogRef = useRef(null)
  const [friends, setFriends] = useState([])
  const [status, setStatus] = useState('Loading friends...')
  const [busy, setBusy] = useState(false)
  const atCapacity = board.usersInvited.length + 1 >= MAX_BOARD_PLAYERS
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    const controller = new AbortController()
    fetch('/api/friends', { signal: controller.signal }).then(async (response) => {
      const result = await response.json()
      if (!response.ok || !result.ok) throw new Error(result.error || 'Could not load friends.')
      setFriends(result.friends)
      setStatus('')
    }).catch((error) => { if (error.name !== 'AbortError') setStatus(error.message) })
    return () => { controller.abort(); dialog.close() }
  }, [])
  const invite = async (friend) => {
    if (busy) return
    setBusy(true)
    setStatus('')
    try {
      const response = await fetch('/api/friends')
      const result = await response.json()
      if (!response.ok || !result.ok) throw new Error(result.error || 'Could not load friends.')
      onUpdate(inviteFriendToBoard(board.id, profile, friend, result.friends))
    } catch (error) { setStatus(error.message) }
    finally { setBusy(false) }
  }
  return <dialog ref={dialogRef} className="board-invite-menu" aria-labelledby="board-invite-title" onCancel={onClose}>
    <h2 id="board-invite-title">Invite friends</h2>
    <p>{board.usersInvited.length + 1}/{MAX_BOARD_PLAYERS} players{atCapacity ? ' — Board full.' : ''}</p>
    <button type="button" className="board-invite-close" aria-label="Close invitations" onClick={onClose}>×</button>
    <div className="board-invite-list">
      {friends.map((friend) => {
        const added = [board.createdBy, ...board.usersInvited].some((user) => user.username === friend.name)
        return <div className="board-invite-friend" key={friend.id}>
          <span className="board-invite-avatar">{friend.profileImage && <img src={friend.profileImage} alt="" />}</span>
          <span className="board-invite-name">{friend.name}</span>
          <button type="button" disabled={busy || added || atCapacity} aria-label={added ? `${friend.name} already added` : `Add ${friend.name} to board`} onClick={() => invite(friend)}><img src={images.confirmIcon} alt="" /></button>
        </div>
      })}
      {!status && friends.length === 0 && <p>No friends yet.</p>}
    </div>
    <p role="status">{status}</p>
  </dialog>
}

function BoardTimer({ createdAt, endedAt }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (endedAt) return
    const update = () => setNow(Date.now())
    const interval = window.setInterval(update, 1000)
    document.addEventListener('visibilitychange', update)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', update)
    }
  }, [endedAt])
  const seconds = Math.max(0, Math.floor(((endedAt || now) - createdAt) / 1000))
  const pad = (value) => String(value).padStart(2, '0')
  const hours = Math.floor(seconds / 3600)
  const elapsed = `${hours > 0 ? `${pad(hours)}:` : ''}${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`
  return <span className="board-timer" role="timer" aria-label="Time since board creation">{elapsed}</span>
}

export default function BoardPage() {
  const profile = useProfile()
  const navigate = useNavigate()
  const selectedPen = penItems.find((pen) => pen.name === profile.selectedPen) || mainPen
  const [board, dispatch] = useReducer(boardReducer, profile, (currentUser) => createBoardState(loadBoard(currentUser)))
  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const highlightColor = board.board.colors.find(({ user }) => user.username === profile.username)?.color || '#174FC4'
  const selectedCell = board.selected === null ? null : board.board.cells[board.selected]
  const selectedNumber = selectedCell?.kind === 'number' ? selectedCell.number : null
  const pen = { fontFamily: selectedPen.fontType, fontWeight: selectedPen.boldness === 'black' ? 900 : selectedPen.boldness }

  useEffect(() => {
    if (!colorPickerOpen) return
    const closeOutside = (event) => {
      if (!event.target.closest?.('[data-board-colors]')) setColorPickerOpen(false)
    }
    const closeOnEscape = (event) => { if (event.key === 'Escape') setColorPickerOpen(false) }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [colorPickerOpen])

  useEffect(() => { saveBoard(board.board) }, [board.board])
  useEffect(() => {
    const sync = (event) => {
      if (event.key !== 'sugoku-boards-v1') return
      const updated = getBoard(board.board.id, profile)
      if (updated) dispatch({ type: 'sync-board', board: updated })
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [board.board.id, profile])
  useEffect(() => {
    if (board.board.archived) return
    if (!board.board.completedAt && !board.board.failedAt && board.board.livesUsed < 5) return
    const completionDelay = board.celebrations.reduce((duration, entry) => Math.max(duration, ...entry.flashes.map((flash) => flash.delay + 500)), 0)
    const timeout = window.setTimeout(() => navigate(`/results/${board.board.id}`, { replace: true }), board.board.completedAt ? completionDelay : 450)
    return () => window.clearTimeout(timeout)
  }, [board.board.archived, board.board.id, board.board.completedAt, board.board.failedAt, board.board.livesUsed, board.celebrations, navigate])

  useEffect(() => {
    const deselectOutside = (event) => {
      if (!event.target.closest?.('[data-board-cell], [data-board-number], [data-board-notes]')) {
        dispatch({ type: 'deselect' })
      }
    }
    const enterNumber = (event) => {
      if (board.board.archived) return
      if (event.ctrlKey || event.metaKey || event.altKey || event.target.closest?.('input, textarea, select, [contenteditable="true"]')) return
      if (['Backspace', 'Delete'].includes(event.key) && board.selected !== null) { event.preventDefault(); dispatch({ type: 'erase' }) }
      if (event.key === 'Escape') dispatch({ type: 'deselect' })
      if (/^[1-9]$/.test(event.key) && board.selected !== null) {
        event.preventDefault()
        dispatch({ type: 'enter', number: Number(event.key), user: profile, pen: { fontFamily: selectedPen.fontType, fontWeight: selectedPen.boldness === 'black' ? 900 : selectedPen.boldness } })
      }
    }
    document.addEventListener('pointerdown', deselectOutside)
    document.addEventListener('keydown', enterNumber)
    return () => {
      document.removeEventListener('pointerdown', deselectOutside)
      document.removeEventListener('keydown', enterNumber)
    }
  }, [board.board.archived, board.selected, selectedPen.fontType, selectedPen.boldness, profile])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div style={{ '--board-highlight': highlightColor, backgroundColor: "#757575", width: "100%", minHeight: "883px", maxWidth: "404px", position: "relative", margin: "0 auto", flexShrink: 0, textAlign: "left", overflow: "hidden" }}>
      <img
        src={images.BgDesk}
        style={{ width: "1268px", height: "881px", position: "absolute", left: "-554px", top: "3px", maxWidth: "none" }}
        alt="bgDeco"
      />
      <img
        src={images.HintDisplay}
        style={{ width: "143px", height: "169px", position: "absolute", left: "254px", top: "5px", maxWidth: "none" }}
        alt="HintDisplay"
      />
      <BoardTimer createdAt={board.board.createdAt} endedAt={board.board.completedAt || board.board.failedAt} />
      <Link to="/" aria-label="Return to home page" style={{ width: "67px", height: "69px", position: "absolute", left: "9px", top: "9px", maxWidth: "none" , display: 'block', zIndex: 10 }}>
        <img src={images.Mainmenubutton} style={{ width: '100%', height: '100%', maxWidth: 'none' }} alt="MainMenuButton" />
      </Link>
      <img
        src={images.BgInvitePage}
        style={{ width: "340px", height: "160px", position: "absolute", left: "64px", top: "723px", maxWidth: "none" }}
        alt="inviteBGpage"
      />
      {Array.from({ length: board.board.size }, (_, index) => {
        const number = index + 1
        if (isNumberComplete(board.board, number)) return null
        return (
          <button
            key={number}
            type="button"
            data-board-number={number}
            className="board-number"
            disabled={Boolean(board.board.archived)}
            aria-label={`Enter ${number}`}
            onClick={() => dispatch({ type: 'enter', number, pen, user: profile })}
            style={{ left: `${[178, 242, 305][index % 3]}px`, top: `${(board.board.size === 6 ? [568, 633] : [536, 600, 665])[Math.floor(index / 3)]}px` }}
          >
            <img src={images[`Select${number}`]} alt="" />
          </button>
        )
      })}
      {board.board.createdBy.username === profile.username && <button type="button" className="board-invite-button" aria-label="Invite friends to board" aria-haspopup="dialog" disabled={Boolean(board.board.archived || board.board.completedAt || board.board.failedAt || board.board.livesUsed >= 5)} onClick={() => setInviteOpen(true)}><img src={images.InviteButton} alt="" /></button>}
      {Array.from({ length: 5 }, (_, index) => <LifeHeart key={index} index={index} lost={board.board.livesUsed >= 5 - index} />)}
      <button type="button" data-board-notes disabled={Boolean(board.board.archived)} className="board-note-toggle" aria-label="Note mode" aria-pressed={board.noteMode} onClick={() => dispatch({ type: 'toggle-notes' })}>
        <img src={images.Takenote} alt="" />
      </button>
      <div style={{ width: '43px', height: '162px', position: 'absolute', left: '30px', top: '539px' }}>
        <img src={selectedPen.image} style={boardPenStyle} alt={selectedPen.name} />
      </div>
      <div style={{ width: "100%", height: "400px", position: "absolute", left: "0px", top: "143px", pointerEvents: "none" }}>
        <img
          src={board.board.size === 6 ? images.Board6x6 : images.Board9x9}
          style={{ width: "100%", height: "400px", position: "absolute", left: "0px", top: "0px", maxWidth: "none" }}
          alt={`${board.board.size} by ${board.board.size} board`}
        />
        {board.board.regions && <ChaosBoardArtwork size={board.board.size} regions={board.board.regions} playerColors={board.board.colors.map((assignment) => assignment.color)} />}
        <div role="group" aria-label="Sudoku board">
          {board.board.cells.map((cell, index) => {
            const row = Math.floor(index / board.board.size)
            const column = index % board.board.size
            const selected = board.selected === index
            return (
              <button
                key={index}
                type="button"
                data-board-cell={index}
                className="board-cell"
                data-chaos={Boolean(board.board.regions)}
                data-selected={selected}
                data-given={Boolean(cell?.given)}
                data-related={isRelatedCell(index, board.selected, board.board.size)}
                data-matching={selectedNumber !== null && cell?.kind === 'number' && cell.number === selectedNumber}
                aria-label={`Row ${row + 1}, column ${column + 1}${board.board.regions ? `, region ${board.board.regions[index] + 1}` : ''}${cell?.kind === 'number' ? `, ${cell.number}` : cell?.kind === 'note' ? `, notes ${cell.numbers.map((note) => note.number).join(', ')}` : ', empty'}`}
                aria-pressed={selected}
                onPointerDown={(event) => { if (event.button === 0) dispatch({ type: 'select', index }) }}
                onClick={(event) => { if (event.detail === 0) dispatch({ type: 'select', index }) }}
                style={{
                  ...tileLayouts[board.board.size][index],
                  ...(cell?.pen || pen),
                  color: cell?.color,
                }}
              >
                {board.celebrations.map((celebration) => {
                  const flash = celebration.flashes.find((entry) => entry.index === index)
                  if (!flash) return null
                  const lastDelay = Math.max(...celebration.flashes.map((entry) => entry.delay))
                  return <span key={celebration.id} className="board-completion-flash" aria-hidden="true"
                    style={{ backgroundColor: celebration.color, animationDelay: `${flash.delay}ms` }}
                    onAnimationEnd={() => { if (flash.delay === lastDelay) dispatch({ type: 'finish-celebration', id: celebration.id }) }} />
                })}
                {cell?.kind === 'number' ? cell.number : cell?.kind === 'note' ? (
                  <span className="board-notes">
                    {cell.numbers.map((note) => <span key={note.number} style={{ gridColumn: (note.number - 1) % 3 + 1, gridRow: Math.floor((note.number - 1) / 3) + 1, ...note.pen, color: selectedNumber === note.number ? '#fff' : note.color }}>{note.number}</span>)}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>
      <div className="board-participants" data-owner={board.board.createdBy.username === profile.username} aria-label="Board participants">{board.board.colors.map(({ user, color }) => <BoardParticipant key={user.username} user={user} color={color} />)}</div>
      {inviteOpen && board.board.createdBy.username === profile.username && <BoardInviteMenu board={board.board} profile={profile} onUpdate={(updated) => dispatch({ type: 'sync-board', board: updated })} onClose={() => setInviteOpen(false)} />}
      <div className="board-color-control" data-board-colors>
        <button type="button" className="board-color-current" aria-label="Change your board color" aria-expanded={colorPickerOpen} aria-controls="board-color-picker" disabled={Boolean(board.board.archived || board.board.completedAt || board.board.failedAt || board.board.livesUsed >= 5)} onClick={() => setColorPickerOpen((open) => !open)}>
          <ColorCircle color={highlightColor} />
        </button>
        {colorPickerOpen && <div id="board-color-picker" className="board-color-picker" role="group" aria-label="Choose your board color">
          {userColors.map((color) => {
            const owner = board.board.colors.find((entry) => entry.color === color && entry.user.username !== profile.username)
            return <button key={color} type="button" className="board-color-option" disabled={Boolean(owner)} aria-label={owner ? `${color}, taken by ${owner.user.username}` : `Use ${color}`} aria-pressed={color === highlightColor} title={owner ? `Taken by ${owner.user.username}` : color} onClick={() => { dispatch({ type: 'change-color', color, user: profile }); setColorPickerOpen(false) }}>
              <ColorCircle color={color} />
              {owner && <span className="board-color-lock" aria-hidden="true">&#128274;</span>}
            </button>
          })}
        </div>}
      </div>
      <p style={{ color: "#000", fontFamily: "'Piedra', serif", fontSize: "60px", lineHeight: "1", width: "42px", height: "44px", position: "absolute", left: "273px", top: "105px" }}>
        {board.board.hintsUsed}
      </p>
      <p role="status" style={{ position: 'absolute', left: '20px', top: '510px', width: '365px', color: '#000', fontFamily: 'var(--font-piedra)', fontSize: '16px', textAlign: 'center', pointerEvents: 'none' }}>{board.board.completedAt ? 'SOLVED' : ''}</p>
    </div>
  );
}



