import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { MainNav } from './components/MainNav';
import { Login } from './pages/Login';

function App() {
	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<MainNav />}>
					<Route path='/' element={<Navigate to='home' />} />
					<Route path='home' element={<Home />} />
					<Route path='login' element={<Login />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
