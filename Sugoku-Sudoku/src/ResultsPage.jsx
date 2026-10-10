import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import * as images from './figmages/index.js'
import { saveProfile, useProfile } from './profileStore.js'
import { getBoard, listBoards, archiveBoard, discardFinishedBoard } from './boardStore.js'
import { requiredXp } from './xp.js'
import './ResultsPage.css'

function formatTime(milliseconds) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000))
  const pad = (value) => String(value).padStart(2, '0')
  const hours = Math.floor(seconds / 3600)
  return `${hours ? `${pad(hours)}:` : ''}${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}`
}

export default function ResultsPage() {
  const profile = useProfile()
  const navigate = useNavigate()
  const { boardId } = useParams()
  const [board, setBoard] = useState(() => getBoard(boardId, profile))
  const [archivedCount, setArchivedCount] = useState(() => listBoards(profile).filter((entry) => entry.archived).length)
  const [status, setStatus] = useState('')
  const resultsVisit = useRef({ visit: 0 })
  const username = profile.username
  useEffect(() => {
    const visitState = resultsVisit.current
    const visit = ++visitState.visit
    const discard = () => discardFinishedBoard(boardId, { username })
    window.addEventListener('pagehide', discard)
    return () => {
      window.removeEventListener('pagehide', discard)
      // React's development effect replay must not discard an open results page.
      queueMicrotask(() => {
        if (visitState.visit === visit) discard()
      })
    }
  }, [boardId, username])
  useEffect(() => {
    if (!board?.completedAt) return
    let mounted = true
    saveProfile({ completedBoardId: board.id }).catch(() => {
      if (mounted) setStatus('Could not save your completion rewards.')
    })
    return () => { mounted = false }
  }, [board?.id, board?.completedAt])
  useLayoutEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [])
  if (!board || (!board.completedAt && !board.failedAt && board.livesUsed < 5)) {
    return <main className="results-page"><p className="results-unavailable">No finished board to display. <Link to="/puzzle-reserve">Return to your puzzles</Link></p></main>
  }
  const finishedAt = board.completedAt || board.failedAt || board.lastOpenedAt || board.createdAt
  const placed = board.cells.filter((cell, index) => cell?.kind === 'number' && !cell.given && (!board.solution || cell.number === board.solution[index]))
  const solved = placed.filter((cell) => cell.user?.username === profile.username).length
  const total = board.cells.filter((cell) => !cell?.given).length
  const xp = board.completedAt ? 5 : 0
  const level = profile.level || 1
  const currentXp = profile.totalXp ?? 0
  const xpTarget = requiredXp(level)
  const archive = () => {
    if (board.archived) return
    if (archivedCount >= 5) { setStatus('Your archive is full.'); return }
    try {
      const updated = archiveBoard(board.id, profile)
      setBoard(updated)
      setArchivedCount((count) => count + 1)
      navigate('/puzzle-reserve')
    } catch (error) { setStatus(error.message || 'Could not save the archive. Please try again.') }
  }
  return (
    <main className="results-page">
      <img src={images.BgSettings} className="results-background" alt="" />
      <img src={images.ArchiveBackground} className="results-archive-background" alt="" />
      <p className="results-archived-count">{archivedCount}/5 Archived</p>
      <section className="results-notebook" aria-label={board.completedAt ? 'Puzzle completed' : 'Puzzle failed'}>
        <img src={images.Results} className="results-paper" alt="" />
        <p className="results-outcome" data-failed={!board.completedAt}>{board.completedAt ? 'SOLVED' : 'FAILED'}</p>
        <div className="results-progress" role="progressbar" aria-label="XP toward next level" aria-valuenow={Math.min(currentXp, xpTarget)} aria-valuemin={0} aria-valuemax={xpTarget} aria-valuetext={`${currentXp} out of ${xpTarget} XP`}>
          <div style={{ width: `${Math.min(100, Math.max(0, currentXp / xpTarget * 100))}%` }} />
          <img src={images.LevelBoard} alt="" />
        </div>
        <p className="results-time">Time: {formatTime(finishedAt - board.createdAt)}</p>
        <p className="results-squares">Squares Solved: <span>{solved}/{total}</span></p>
        <p className="results-xp">XP Earned: {xp}</p>
        <p className="results-level">Level: {level}</p>
        <p className="results-progress-count">{currentXp}/{xpTarget}</p>
      </section>
      <button type="button" className="results-archive-button" onClick={archive} disabled={board.archived || archivedCount >= 5} aria-label={board.archived ? 'Board archived' : 'Archive board'}><img src={images.ArchiveButton} alt="" /></button>
      <p className="results-status" role="status">{status}</p>
      <Link to="/" className="results-home" aria-label="Return to home page"><img src={images.Mainmenubutton} alt="" /></Link>
    </main>
  )
}
