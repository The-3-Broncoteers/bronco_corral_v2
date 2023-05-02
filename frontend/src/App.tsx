import { Route, Routes } from 'react-router-dom';
import { DashBoard } from './pages/DashBoard';
import { MainNav } from './components/MainNav';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { Logout } from './pages/Logout';
import { RequireAuth } from './components/RequireAuth';

function App() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<Login />} />

			<Route element={<RequireAuth />}>
				<Route path='/user/' element={<MainNav />}>
					<Route path='dashboard' element={<DashBoard />} />
					<Route path='logout' element={<Logout />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
