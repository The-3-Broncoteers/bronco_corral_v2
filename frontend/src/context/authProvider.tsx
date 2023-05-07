import { createContext, useState } from 'react';

interface AuthContextType {
	auth: any;
	persist: any;
	setAuth: React.Dispatch<React.SetStateAction<any>>;
	setPersist: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType>({
	auth: {},
	persist: {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setAuth: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setPersist: () => {},
});

export const AuthProvider = ({ children }: any) => {
	const [auth, setAuth] = useState({});
	const [persist, setPersist] = useState(() => {
		const persistValue = localStorage.getItem('persist');
		return persistValue ? JSON.parse(persistValue) : false;
	});

	return (
		<AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
