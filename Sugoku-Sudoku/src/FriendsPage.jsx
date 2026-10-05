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

function FriendRow({ friend, small = false }) {
  return (
    <div className={`friends-row${small ? ' friends-row-small' : ''}`}>
      <span className="friends-avatar" aria-hidden="true" />
      <span className="friends-name">{friend.name}</span>
      <span className="friends-dot" aria-hidden="true" />
    </div>
  )
}

export default function FriendManagement({ friends = sampleFriends, searchResults = sampleResults }) {
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
      <div className="friends-list friends-scroll" role="region" aria-label="Friends list" tabIndex={0}>
        <div className="friends-rows">
          {friends.map((friend) => <FriendRow key={friend.id} friend={friend} />)}
        </div>
      </div>
      <img src={images.FindFriends} className="friends-search-art" alt="Find friends" />
      <input
        className="friends-search"
        type="search"
        aria-label="Search for friends"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="friends-results friends-scroll" role="region" aria-label="Find friends results" tabIndex={0}>
        <div className="friends-rows">
          {results.map((friend) => <FriendRow key={friend.id} friend={friend} small />)}
          {results.length === 0 && <p className="friends-empty">No friends found.</p>}
        </div>
      </div>
      <Link to="/" aria-label="Return to home page" className="friends-home">
        <img src={images.Mainmenubutton} alt="Main menu" />
      </Link>
    </div>
  )
}
