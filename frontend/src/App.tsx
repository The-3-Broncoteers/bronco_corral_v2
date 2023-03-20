import { Route, Routes } from 'react-router-dom';
import { UserDashBoard } from './pages/UserDashBoard';
import { MainNav } from './components/MainNav';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/' element={<MainNav />}>
				<Route path='login' element={<Login />} />
				<Route path='home' element={<UserDashBoard />} />
				<Route path='user' element={<MainNav />}>
					<Route path='dashboard' element={<UserDashBoard />} />
					<Route path='logout' element={<Login />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
