import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'
import './FriendsPage.css'

const FRIENDS_PER_PAGE = 6

function RemoveFriendDialog({ friend, onCancel, onConfirm }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    dialog.showModal()
    return () => dialog.close()
  }, [])
  return (
    <dialog ref={dialogRef} className="friends-confirm" aria-labelledby="remove-friend-description" onCancel={onCancel}>
      <p id="remove-friend-description">Remove <strong>{friend.name}</strong> from your friends?</p>
      <div className="friends-confirm-actions">
        <button type="button" className="friends-confirm-button friends-confirm-remove" aria-label={`Remove ${friend.name}`} title="Remove" onClick={onConfirm}>
          <img src={images.confirmIcon} alt="" aria-hidden="true" />
        </button>
        <button type="button" className="friends-confirm-button friends-confirm-cancel" aria-label="Cancel removal" title="Cancel" autoFocus onClick={onCancel}>
          <img src={images.cancelIcon} alt="" aria-hidden="true" />
        </button>
      </div>
    </dialog>
  )
}

function FriendName({ name, small }) {
  const frameRef = useRef(null)
  const textRef = useRef(null)
  useLayoutEffect(() => {
    const frame = frameRef.current
    const text = textRef.current
    let active = true
    const fit = () => {
      if (!active) return
      const baseSize = small ? 14 : 18
      text.style.fontSize = `${baseSize}px`
      const width = text.getBoundingClientRect().width
      const availableWidth = Math.max(0, frame.clientWidth - 10)
      if (width > availableWidth && availableWidth > 0) {
        text.style.fontSize = `${baseSize * availableWidth / width}px`
      }
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(frame)
    document.fonts.ready.then(fit)
    document.fonts.addEventListener('loadingdone', fit)
    return () => {
      active = false
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', fit)
    }
  }, [name, small])
  return <span className="friends-name" ref={frameRef}><span className="friends-name-text" ref={textRef}>{name}</span></span>
}

function FriendRow({ friend, small = false, onRemove, onConfirm, disabled, actionLabel }) {
  const hasRemoveAction = Boolean(onRemove)

  return (
    <div className={`friends-row${small ? ' friends-row-small' : ''}`}>
      <span className="friends-avatar" aria-hidden="true">
        {friend.profileImage && <img src={friend.profileImage} alt="" />}
      </span>
      <FriendName name={friend.name} small={small} />
      {hasRemoveAction ? (
        <button type="button" className="friends-remove" aria-label={`Remove ${friend.name}`} onClick={() => onRemove(friend.id)}>
          <img src={images.cancelIcon} alt="" aria-hidden="true" />
        </button>
      ) : small ? (
        <button type="button" className="friends-dot friends-dot-confirm" disabled={disabled} aria-label={`${actionLabel} ${friend.name}`} onClick={() => onConfirm(friend.id)}>
          <img src={images.confirmIcon} alt="" aria-hidden="true" />
        </button>
      ) : (
        <span className="friends-dot" aria-hidden="true" />
      )}
    </div>
  )
}

export default function FriendManagement() {
  const [menu, setMenu] = useState('find')
  const [search, setSearch] = useState('')
  const [data, setData] = useState({ friends: [], searchResults: [], friendRequests: [] })
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const [revision, setRevision] = useState(0)
  const query = search.trim()
  const searchReady = query.length >= 3
  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/friends?search=${encodeURIComponent(query.length >= 3 ? query : '')}`, { signal: controller.signal })
        const result = await response.json()
        if (!response.ok || !result.ok) throw new Error(result.error || 'Could not load friends.')
        setData({ ...result, query })
      } catch (error) {
        if (error.name !== 'AbortError') setStatus(error.message)
      }
    }, query.length >= 3 ? 200 : 0)
    return () => { clearTimeout(timer); controller.abort() }
  }, [query, revision])
  const [page, setPage] = useState(0)
  const [pendingRemoval, setPendingRemoval] = useState(null)
  const remainingFriends = data.friends
  const friendRequests = data.friendRequests
  const pageCount = Math.max(1, Math.ceil(remainingFriends.length / FRIENDS_PER_PAGE))
  const currentPage = Math.min(page, pageCount - 1)
  const pageFriends = remainingFriends.slice(currentPage * FRIENDS_PER_PAGE, (currentPage + 1) * FRIENDS_PER_PAGE)
  const friendAction = async (action, id) => {
    if (busy) return
    setBusy(true)
    setStatus('')
    try {
      const response = await fetch('/api/friends', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, id }) })
      const result = await response.json()
      if (!response.ok || !result.ok) throw new Error(result.error || 'Could not update friends.')
      setStatus(action === 'request' ? 'Friend request sent.' : action === 'accept' ? '' : 'Friend removed.')
      setRevision((value) => value + 1)
    } catch (error) { setStatus(error.message) }
    finally { setBusy(false) }
  }
  const results = searchReady && data.query === query ? data.searchResults : []

  return (
    <div className="friends-page">
      <img
        src={images.BgFriends}
        className="friends-background"
        alt=""
      />
      <img src={images.FriendsPage} className="friends-notebook" alt="Friends" />
      <button
        type="button"
        className={`friends-phone-button friends-phone-button-${menu === 'find' ? 'top' : 'bottom'}`}
        aria-label={menu === 'find' ? 'Show friend requests' : 'Show find friends'}
        aria-controls="friends-menu"
        onClick={() => setMenu(menu === 'find' ? 'requests' : 'find')}
      >
        <img src={images.PhoneButton} alt="" />
      </button>
      <div className="friends-list" role="region" aria-label="Friends list">
        <div className="friends-rows">
          {pageFriends.map((friend) => <FriendRow key={friend.id} friend={friend} onRemove={() => setPendingRemoval(friend)} />)}
          {remainingFriends.length === 0 && <p className="friends-empty">No friends yet.</p>}
        </div>
      </div>
      <button type="button" className="friends-page-arrow friends-page-previous" aria-label="Previous friends page" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)} />
      <span className="friends-page-number" aria-live="polite">{currentPage + 1} / {pageCount}</span>
      <button type="button" className="friends-page-arrow friends-page-next" aria-label="Next friends page" disabled={currentPage >= pageCount - 1} onClick={() => setPage(currentPage + 1)} />
      <section id="friends-menu" aria-label={menu === 'find' ? 'Find friends' : 'Friend requests'}>
      <img src={menu === 'find' ? images.FindFriends : images.FriendRequests} className="friends-search-art" alt={menu === 'find' ? 'Find friends' : 'Friend requests'} />
      {menu === 'find' && (
      <input
        className="friends-search"
        type="search"
        aria-label="Search for friends"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      )}
      <div key={menu} className={`friends-results friends-scroll${menu === 'requests' ? ' friends-requests' : ''}`} role="region" aria-label={menu === 'find' ? 'Find friends results' : 'Friend requests list'} tabIndex={0}>
        <div className="friends-rows">
          {(menu === 'find' ? results : friendRequests).map((friend) => <FriendRow key={friend.id} friend={friend} small disabled={busy} actionLabel={menu === 'find' ? 'Send friend request to' : 'Accept friend request from'} onConfirm={(id) => friendAction(menu === 'find' ? 'request' : 'accept', id)} />)}
          {menu === 'find' && searchReady && data.query === query && results.length === 0 && <p className="friends-empty friends-search-empty">No users found.</p>}
          {menu === 'requests' && friendRequests.length === 0 && <p className="friends-empty">No friend requests.</p>}
        </div>
      </div>
      </section>
      <p className="friends-status" role="status">{status}</p>
      <Link to="/" aria-label="Return to home page" className="friends-home">
        <img src={images.Mainmenubutton} alt="Main menu" />
      </Link>
      {pendingRemoval && (
        <RemoveFriendDialog
          friend={pendingRemoval}
          onCancel={() => setPendingRemoval(null)}
          onConfirm={() => {
            friendAction('remove', pendingRemoval.id)
            setPendingRemoval(null)
          }}
        />
      )}
    </div>
  )
}
