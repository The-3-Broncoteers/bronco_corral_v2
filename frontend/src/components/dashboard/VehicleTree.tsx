import { useContext, useEffect, useState } from 'react';
import { axiosPublic } from '../../config/axiosConfig';
import AuthContext from '../../context/authProvider';
import styled from 'styled-components';
import { Colors } from '../../utils/Colors';

interface UserVehicle {
	vin: string;
	make: string;
	model: string;
	year: number;
}

interface VehicleGroup {
	make: string;
	models: { [key: string]: { years: number[] } };
}

const StyledTree = styled.div`
	background-color: ${Colors.MintCream};
	min-width: 13em;
	padding-left: 0.5em;
`;

export const VehicleTree = () => {
	const [vehicleGroups, setVehicleGroups] = useState<VehicleGroup[]>([]);
	const [selectedMake, setSelectedMake] = useState<string>('');
	const [selectedModel, setSelectedModel] = useState<string>('');
	const [selectedVin, setSelectedVin] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<number>(0);
	const { auth } = useContext(AuthContext);

	useEffect(() => {
		const fetchVehicles = async () => {
			try {
				const response = await axiosPublic.get('/vehicles', {
					params: {
						email: auth.email,
					},
				});

				//console.log('res ' + JSON.parse(response.data));
				const groups = buildVehicleGroups(response.data);
				setVehicleGroups(groups);
			} catch (error) {
				console.error('Error fetching vehicles:', error);
			}
		};

		fetchVehicles();
	}, []);

	const buildVehicleGroups = (vehicles: UserVehicle[]): VehicleGroup[] => {
		const groups: VehicleGroup[] = [];

		vehicles.forEach((vehicle) => {
			// Check if group already exists for the make
			const makeIndex = groups.findIndex((group) => group.make === vehicle.make);

			if (makeIndex === -1) {
				// Create new group for make
				const newGroup: VehicleGroup = {
					make: vehicle.make,
					models: {
						[vehicle.model]: { years: [vehicle.year] },
					},
				};
				groups.push(newGroup);
			} else {
				// Add model to existing group for make
				const group = groups[makeIndex];
				if (group.models[vehicle.model]) {
					// Add year to existing model
					group.models[vehicle.model].years.push(vehicle.year);
				} else {
					// Create new model for make
					group.models[vehicle.model] = { years: [vehicle.year] };
				}
			}
		});

		return groups;
	};

	return (
		<StyledTree>
			<ul className='vehicle-groups'>
				{vehicleGroups.map((group) => (
					<li key={group.make} className='vehicle-make'>
						<h3>{group.make}</h3>
						<ul className='vehicle-models'>
							{Object.entries(group.models).map(([model, years]) => (
								<li key={model} className='vehicle-model'>
									<h4>{model}</h4>
									<ul className='vehicle-years'>
										{years.years.map((year) => (
											<li key={year} className='vehicle-year'>
												<button>{year}</button>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</li>
				))}
			</ul>
		</StyledTree>
	);
};
