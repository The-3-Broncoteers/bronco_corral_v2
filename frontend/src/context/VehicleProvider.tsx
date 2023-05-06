import {
	createContext,
	Dispatch,
	SetStateAction,
	useState,
	useEffect,
	useContext,
	FunctionComponent,
	ReactNode,
} from 'react';
import { UserVehicle } from '../components/dashboard/UserVehicle';
import { axiosPublic } from '../config/axiosConfig';
import AuthContext from './authProvider';

type VehicleContextType = {
	vehicleList: UserVehicle[];
	setVehicleList: Dispatch<SetStateAction<UserVehicle[]>>;
};

type VehicleContextProviderProps = {
	children: ReactNode;
};

export const VehicleContext = createContext<VehicleContextType>({
	vehicleList: [],
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setVehicleList: () => {},
});

export const VehicleContextProvider: FunctionComponent<VehicleContextProviderProps> = ({
	children,
}) => {
	const [vehicleList, setVehicleList] = useState<UserVehicle[]>([]);
	const { auth } = useContext(AuthContext);

	useEffect(() => {
		const fetchVehicleData = async () => {
			try {
				const response = await axiosPublic.get('/vehicles', {
					params: {
						email: auth.email,
					},
				});

				const data = response.data;

				setVehicleList(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchVehicleData();
		console.log(vehicleList);
	}, []);

	return (
		<VehicleContext.Provider value={{ vehicleList, setVehicleList }}>
			{children}
		</VehicleContext.Provider>
	);
};
