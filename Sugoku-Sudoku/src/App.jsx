import { Route, Routes } from 'react-router-dom'
import FriendsPage from './FriendsPage.jsx'
import HomePage from './HomePage.jsx'

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/friends" element={<FriendsPage />} />
		</Routes>
	)
}
