import { useContext, useEffect, useState } from 'react';
import { axiosPublic } from '../../config/axiosConfig';
import AuthContext from '../../context/authProvider';
import styled from 'styled-components';
import { Colors } from '../../utils/Colors';
import { UserVehicle } from './UserVehicle';
import { VehicleContext } from '../../context/VehicleProvider';

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
	const [selectedMake, setSelectedMake] = useState<string>('');
	const [selectedModel, setSelectedModel] = useState<string>('');
	const [selectedVin, setSelectedVin] = useState<string>('');
	const [selectedYear, setSelectedYear] = useState<number>(0);
	const [expandedModels, setExpandedModels] = useState<{ [key: string]: boolean }>({});
	const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({});
	const { vehicleList } = useContext(VehicleContext);

	const buildVehicleGroups = (vehicles: UserVehicle[]): VehicleGroup[] => {
		const groups: VehicleGroup[] = [];

		vehicles.forEach((vehicle) => {
			const makeIndex = groups.findIndex((group) => group.make === vehicle.make);

			if (makeIndex === -1) {
				const newGroup: VehicleGroup = {
					make: vehicle.make,
					models: {
						[vehicle.model]: { years: [vehicle.year], vins: [vehicle.vin] },
					},
				};
				groups.push(newGroup);
			} else {
				const group = groups[makeIndex];
				if (group.models[vehicle.model]) {
					group.models[vehicle.model].years.push(vehicle.year);
					group.models[vehicle.model].vins.push(vehicle.vin);
				} else {
					group.models[vehicle.model] = { years: [vehicle.year], vins: [vehicle.vin] };
				}
			}
		});

		return groups;
	};

	const [expandedGroups, setExpandedGroups] = useState<boolean[]>(
		new Array(vehicleList.length).fill(false),
	);

	const toggleGroup = (index: number) => {
		const newExpandedGroups = [...expandedGroups];
		newExpandedGroups[index] = !newExpandedGroups[index];
		setExpandedGroups(newExpandedGroups);
	};

	const toggleModel = (model: string) => {
		setExpandedModels((prevState) => ({
			...prevState,
			[model]: !prevState[model],
		}));
	};

	const toggleYear = (yearKey: string) => {
		setExpandedYears((prevState) => ({
			...prevState,
			[yearKey]: !prevState[yearKey],
		}));
	};

	const vehicleGroups = buildVehicleGroups(vehicleList);

	return (
		<StyledTree>
			<ul className='vehicle-groups'>
				{vehicleGroups.map((group, index) => (
					<li key={group.make} className='vehicle-make'>
						<h3 className='make-name'>
							<ToggleButton onClick={() => toggleGroup(index)}>
								{expandedGroups[index] ? '▼' : '►'}
							</ToggleButton>
							{group.make}
						</h3>
						{expandedGroups[index] && (
							<ul className='vehicle-models'>
								{Object.entries(group.models).map(([model, data]) => (
									<li key={model} className='vehicle-model'>
										<h4 className='model-name'>
											<ToggleButton onClick={() => toggleModel(model)}>
												{expandedModels[model] ? '▼' : '►'}
											</ToggleButton>
											{model}
										</h4>
										{expandedModels[model] && (
											<ul className='vehicle-years'>
												{data.years.map((year, yearIndex) => (
													<li key={year} className='vehicle-year'>
														<span className='year-label'>
															<ToggleButton onClick={() => toggleYear(`${model}-${year}`)}>
																{expandedYears[`${model}-${year}`] ? '▼' : '►'}
															</ToggleButton>
															{year}
														</span>
														{expandedYears[`${model}-${year}`] && data.vins[yearIndex] && (
															<button
																className='vin-button'
																onClick={() => {
																	setSelectedMake(group.make);
																	setSelectedModel(model);
																	setSelectedYear(year);
																	setSelectedVin(data.vins[yearIndex]);
																}}
															>
																VIN: {data.vins[yearIndex]}
															</button>
														)}
													</li>
												))}
											</ul>
										)}
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
