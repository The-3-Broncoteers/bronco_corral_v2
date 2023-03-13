import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { MainNav } from './components/MainNav';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/' element={<MainNav />}>
				<Route path='home' element={<Home />} />
				<Route path='login' element={<Login />} />
			</Route>
		</Routes>
	);
}

export default App;
