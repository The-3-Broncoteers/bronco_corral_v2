import { Route, Routes } from 'react-router-dom';
import { MainNav } from './components/MainNav';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { RequireAuth } from './components/auth/RequireAuth';
import PersistLogin from './components/auth/PersistLogin';
import { DashboardController } from './pages/DashboardController';

function App() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<Login />} />

			<Route element={<PersistLogin />}>
				<Route element={<RequireAuth />}>
					<Route path='/user/' element={<MainNav />}>
						<Route path='dashboard' element={<DashboardController />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
