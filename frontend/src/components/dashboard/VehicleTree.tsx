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
	models: { [key: string]: { years: number[]; vins: string[] } };
}

const StyledTree = styled.div`
	background-color: ${Colors.MintCream};
	min-width: 13em;
	padding-left: 0.5em;
`;

const ToggleButton = styled.button`
	border: none;
	background: none;
	padding: 0.25rem 0.5rem;
	cursor: pointer;
	color: ${Colors.SlateGray};
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
						[vehicle.model]: { years: [vehicle.year], vins: [vehicle.vin] },
					},
				};
				groups.push(newGroup);
			} else {
				// Add model to existing group for make
				const group = groups[makeIndex];
				if (group.models[vehicle.model]) {
					// Add year and VIN to existing model
					group.models[vehicle.model].years.push(vehicle.year);
					group.models[vehicle.model].vins.push(vehicle.vin);
				} else {
					// Create new model for make
					group.models[vehicle.model] = { years: [vehicle.year], vins: [vehicle.vin] };
				}
			}
		});

		return groups;
	};

	const [expandedGroups, setExpandedGroups] = useState<boolean[]>(
		new Array(vehicleGroups.length).fill(false),
	);

	const toggleGroup = (index: number) => {
		const newExpandedGroups = [...expandedGroups];
		newExpandedGroups[index] = !newExpandedGroups[index];
		setExpandedGroups(newExpandedGroups);
	};

	return (
		<StyledTree>
			<ul className='vehicle-groups'>
				{vehicleGroups.map((group, index) => (
					<li key={group.make} className='vehicle-make'>
						<h3 className='make-name'>
							<ToggleButton onClick={() => toggleGroup(index)}>
								{expandedGroups[index] ? '▼' : '►'}{' '}
							</ToggleButton>
							{group.make}
						</h3>
						{expandedGroups[index] && (
							<ul className='vehicle-models'>
								{Object.entries(group.models).map(([model, data]) => (
									<li key={model} className='vehicle-model'>
										<h4 className='model-name'>{model}</h4>
										<ul className='vehicle-years'>
											{data.years.map((year, index) => (
												<li key={year} className='vehicle-year'>
													<span className='year-label'>{year}</span>
													{data.vins[index] && (
														<button
															className='vin-button'
															onClick={() => {
																setSelectedMake(group.make);
																setSelectedModel(model);
																setSelectedYear(year);
																setSelectedVin(data.vins[index]);
															}}
														>
															VIN: {data.vins[index]}
														</button>
													)}
												</li>
											))}
										</ul>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</StyledTree>
	);
};
