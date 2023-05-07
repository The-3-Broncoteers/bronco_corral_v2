import { Route, Routes } from 'react-router-dom';
import { MainNav } from './components/MainNav';
import { CarProfilePage } from './pages/CarProfilePage';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { TrackerPage } from './pages/TrackerPage';
import { RequireAuth } from './components/auth/RequireAuth';
import { DashboardController } from './pages/DashboardController';

function App() {
	return (
		<Routes>
			<Route path='/carprofile' element={<CarProfilePage />} />
			<Route path='/track' element={<TrackerPage />} />
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<Login />} />

			<Route element={<RequireAuth />}>
				<Route path='/user/' element={<MainNav />}>
					<Route path='dashboard' element={<DashboardController />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
