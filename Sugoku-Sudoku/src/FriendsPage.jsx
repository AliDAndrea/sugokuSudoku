import * as images from './figmages/index.js'

export default function FriendsPage() {
  return (
    <div className="bg-[#FFF] min-w-screen min-h-screen overflow-hidden">
      <img
        src={images.BgFriends}
        className="w-full h-full absolute left-0 top-0 max-w-none"
        alt="Friends page background"
      />
    </div>
  )
}