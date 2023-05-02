import { createContext, useState } from 'react';

interface AuthContextType {
	auth: any;
	setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType>({
	auth: {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setAuth: () => {},
});

export const AuthProvider = ({ children }: any) => {
	const [auth, setAuth] = useState({});

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
