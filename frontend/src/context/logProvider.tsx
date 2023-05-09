import {
	FunctionComponent,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { VehicleContext } from './VehicleProvider';
import axios from 'axios';
import { addLog, logObject } from '../utils/updateLogContext';

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
	const { vehicleList } = useContext(VehicleContext);

	useEffect(() => {
		console.log('log test');
		const updateLogContext = async () => {
			if (hasDataFlag == false) {
				for (let i = 0; i < vehicleList.length; i++) {
					const id = vehicleList[i].id;
					const vin = vehicleList[i].vin;
					try {
						let res = await axios.get('/maintenance', {
							params: {
								id: id,
							},
						});

						const resData: logObject = {
							desc: res.data.desc,
							dueMileage: res.data.dueMileage,
							vin: vin,
						};
						addLog(resData);
					} catch (error) {
						console.log(error);
					}
				}
				setHasDataFlag(true);
				console.log(logs);
			}
		};
		updateLogContext();
	}, []);

	return (
		<LogContext.Provider value={{ logs, setLogs, hasDataFlag, setHasDataFlag }}>
			{children}
		</LogContext.Provider>
	);
};
