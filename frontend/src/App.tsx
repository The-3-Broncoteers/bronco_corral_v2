import { Route, Routes } from 'react-router-dom';
import { UserDashBoard } from './pages/UserDashBoard';
import { MainNav } from './components/MainNav';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { Logout } from './pages/Logout';

function App() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<Login />} />

			<Route path='/test/*' element={<MainNav />}>
				<Route path='dashboard' element={<UserDashBoard />} />
			</Route>

			<Route path='/user/' element={<MainNav />}>
				<Route path='dashboard' element={<UserDashBoard />} />
				<Route path='logout' element={<Logout />} />
			</Route>
		</Routes>
	);
}

export default App;
