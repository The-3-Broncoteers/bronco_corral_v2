import { createContext, useState } from 'react';

interface LogContextType {
	logs: any;
	hasDataFlag: boolean;
	setHasDataFlag: React.Dispatch<React.SetStateAction<any>>;
	setLogs: React.Dispatch<React.SetStateAction<any>>;
}

const LogContext = createContext<LogContextType>({
	logs: {},
	hasDataFlag: false,
	setHasDataFlag: () => {},
	setLogs: () => {},
});

export const logProvider = ({ children }: any) => {
	const [logs, setLogs] = useState([]);
	const [hasDataFlag, setHasDataFlag] = useState(false);

	return (
		<LogContext.Provider value={{ logs, setLogs, hasDataFlag, setHasDataFlag }}>
			{children}
		</LogContext.Provider>
	);
};

export default LogContext;
