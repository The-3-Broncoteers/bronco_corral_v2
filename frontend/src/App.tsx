import { Route, Routes } from 'react-router-dom';
import { UserDashBoard } from './pages/UserDashBoard';
import { MainNav } from './components/MainNav';
import { CarProfilePage } from './pages/CarProfilePage';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { TrackerPage } from './pages/TrackerPage';
import { Logout } from './pages/Logout';

function App() {
	return (
		<Routes>
			<Route path='/carprofile' element={<CarProfilePage />} />
			<Route path='/track' element={<TrackerPage />} />
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
