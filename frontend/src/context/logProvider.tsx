import { FunctionComponent, ReactNode, createContext, useState } from 'react';

/**
 * Creates context and stores logs in context
 *
 * @param - none
 * @returns LogContext.Provider
 */

type LogContextType = {
	logs: any;
	hasDataFlag: boolean;
	setHasDataFlag: React.Dispatch<React.SetStateAction<any>>;
	setLogs: React.Dispatch<React.SetStateAction<any>>;
};

type LogContextProviderProps = {
	children: ReactNode;
};

export const LogContext = createContext<LogContextType>({
	hasDataFlag: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setHasDataFlag: () => {},
	logs: {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setLogs: () => {},
});

export const LogProvider: FunctionComponent<LogContextProviderProps> = ({ children }: any) => {
	const [logs, setLogs] = useState([]);
	const [hasDataFlag, setHasDataFlag] = useState(false);

	return (
		<LogContext.Provider value={{ logs, setLogs, hasDataFlag, setHasDataFlag }}>
			{children}
		</LogContext.Provider>
	);
};
