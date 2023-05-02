import { useContext } from 'react';
import AuthContext from '../context/authProvider2';

export const useAuth = () => {
	return useContext(AuthContext);
};
