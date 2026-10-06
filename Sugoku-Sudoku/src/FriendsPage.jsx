import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as images from './figmages/index.js'
import './FriendsPage.css'

const sampleFriends = Array.from({ length: 18 }, (_, index) => ({
  id: `friend-${index + 1}`,
  name: 'friendO_135x7',
}))
const sampleResults = Array.from({ length: 12 }, (_, index) => ({
  id: `result-${index + 1}`,
  name: 'friendO_135x7',
}))
const sampleRequests = Array.from({ length: 8 }, (_, index) => ({
  id: `request-${index + 1}`,
  name: 'friendO_135x7',
}))

function FriendRow({ friend, small = false }) {
  return (
    <div className={`friends-row${small ? ' friends-row-small' : ''}`}>
      <span className="friends-avatar" aria-hidden="true" />
      <span className="friends-name">{friend.name}</span>
      <span className="friends-dot" aria-hidden="true" />
    </div>
  )
}

export default function FriendManagement({ friends = sampleFriends, searchResults = sampleResults, friendRequests = sampleRequests }) {
  const [menu, setMenu] = useState('find')
  const [search, setSearch] = useState('')
  const results = searchResults.filter((friend) => friend.name.toLowerCase().includes(search.toLowerCase()))

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
      <div className="friends-list friends-scroll" role="region" aria-label="Friends list" tabIndex={0}>
        <div className="friends-rows">
          {friends.map((friend) => <FriendRow key={friend.id} friend={friend} />)}
        </div>
      </div>
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
          {(menu === 'find' ? results : friendRequests).map((friend) => <FriendRow key={friend.id} friend={friend} small />)}
          {menu === 'find' && results.length === 0 && <p className="friends-empty">No friends found.</p>}
          {menu === 'requests' && friendRequests.length === 0 && <p className="friends-empty">No friend requests.</p>}
        </div>
      </div>
      </section>
      <Link to="/" aria-label="Return to home page" className="friends-home">
        <img src={images.Mainmenubutton} alt="Main menu" />
      </Link>
    </div>
  )
}
