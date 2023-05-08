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
	selectedVehicle: UserVehicle | null;
	setSelectedVehicle: Dispatch<SetStateAction<UserVehicle | null>>;
};

type VehicleContextProviderProps = {
	children: ReactNode;
};

export const VehicleContext = createContext<VehicleContextType>({
	vehicleList: [],
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setVehicleList: () => {},
	selectedVehicle: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setSelectedVehicle: () => {},
});

export const VehicleContextProvider: FunctionComponent<VehicleContextProviderProps> = ({
	children,
}) => {
	const [vehicleList, setVehicleList] = useState<UserVehicle[]>([]);
	const [selectedVehicle, setSelectedVehicle] = useState<UserVehicle | null>(null);
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
	}, []);

	return (
		<VehicleContext.Provider
			value={{ vehicleList, setVehicleList, selectedVehicle, setSelectedVehicle }}
		>
			{children}
		</VehicleContext.Provider>
	);
};
