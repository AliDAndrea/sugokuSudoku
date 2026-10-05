import { Route, Routes } from 'react-router-dom'
import FriendsPage from './FriendsPage.jsx'
import HomePage from './HomePage.jsx'
import PuzzleReserve from './PuzzleReservePage.jsx'
import BoardCreatorPage from './BoardCreatorPage.jsx'
import BoardPage from './BoardPage.jsx'
import ShopPagePensTab from './ShopPagePensTab.jsx'
import ShopPagePacksTab from './ShopPagePacksTab.jsx'
import ShopPageCurrencyTab from './ShopPageCurrencyTab.jsx'
import ProfilePage from './ProfilePage.jsx'

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/friends" element={<FriendsPage />} />
			<Route path="/puzzle-reserve" element={<PuzzleReserve />} />
			<Route path="/board-creator" element={<BoardCreatorPage />} />
			<Route path="/board" element={<BoardPage />} />
			<Route path="/shop/pens" element={<ShopPagePensTab />} />
			<Route path="/shop/packs" element={<ShopPagePacksTab />} />
			<Route path="/shop/currency" element={<ShopPageCurrencyTab />} />
			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/profile/change-password" element={<ProfilePage />} />
			<Route path="/profile/change-email" element={<ProfilePage />} />
		</Routes>
	)
}
