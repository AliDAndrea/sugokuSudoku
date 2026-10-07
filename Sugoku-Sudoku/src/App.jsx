import { Route, Routes } from 'react-router-dom'
import FriendsPage from './FriendsPage.jsx'
import HomePage from './HomePage.jsx'
import PuzzleReserve from './PuzzleReservePage.jsx'
import BoardCreatorPage from './BoardCreatorPage.jsx'
import BoardPage from './BoardPage.jsx'
import ShopPage from './ShopPage.jsx'
import ProfilePage from './ProfilePage.jsx'
import AuthPage from './AuthPage.jsx'

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/friends" element={<FriendsPage />} />
			<Route path="/puzzle-reserve" element={<PuzzleReserve />} />
			<Route path="/board-creator" element={<BoardCreatorPage />} />
			<Route path="/board" element={<BoardPage />} />
			<Route path="/shop" element={<ShopPage />} />
			<Route path="/shop/pens" element={<ShopPage key="pens" initialTab="pens" />} />
			<Route path="/shop/packs" element={<ShopPage key="packs" initialTab="packs" />} />
			<Route path="/shop/currency" element={<ShopPage key="currency" initialTab="currency" />} />
			<Route path="/sign-in" element={<AuthPage />} />
			<Route path="/sign-up" element={<AuthPage />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/profile/change-password" element={<ProfilePage />} />
			<Route path="/profile/change-email" element={<ProfilePage />} />
		</Routes>
	)
}
