import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/authProvider';

export const useAuth = () => {
	const { auth } = useContext(AuthContext);

	useDebugValue(auth, (auth) => (auth?.email ? 'Logged In' : 'Logged Out'));

	return useContext(AuthContext);
};
