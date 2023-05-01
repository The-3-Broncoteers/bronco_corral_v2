import { createContext, useState } from 'react';

interface Auth {
	email?: string;
	password?: string;
	accessToken?: string;
}
const AuthContext = createContext<{ auth?: Auth; setAuth?: (auth: Auth) => void }>({});

export const AuthProvider = ({ children }: any) => {
	const [auth, setAuth] = useState({});

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
