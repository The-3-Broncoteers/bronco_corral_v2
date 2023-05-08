import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/Colors';
import { UserVehicle } from './UserVehicle';
import { VehicleContext } from '../../context/VehicleProvider';

interface VehicleGroup {
	make: string;
	models: {
		[key: string]: {
			[key: string]: string[];
		};
	};
}

const StyledTree = styled.div`
	background-color: ${Colors.MintCream};
	min-height: 100%;
	overflow-y: auto;
	overflow-x: auto;
	min-width: 15vw;
	max-width: 15vw;
	border-top-left-radius: 0.7em;

	&.sbar::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: ${Colors.White};
	}

	&.sbar::-webkit-scrollbar {
		width: 12px;
		background-color: ${Colors.White};
	}

	&.sbar::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: ${Colors.DarkBlue};
	}

	ul {
		list-style: none;
	}

	li {
	}

	button {
		border: none;
		background: none;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		color: ${Colors.SlateGray};
	}

	.vehicle-groups {
		margin: 0px;
		height: 100%;
		padding: 0;
	}

	h3,
	h4 {
		display: inline-flex;
		align-items: center;
		margin: 0;
	}

	.vehicle-make {
		margin-bottom: 0.5rem;
	}

	.make-name {
		font-weight: bold;
		font-size: 1rem;
	}

	.vehicle-models {
		padding-left: 1rem; /* Add some padding to the list of vehicle models */
	}

	.vehicle-model {
		margin-bottom: 0.25rem;
	}

	.model-name {
		font-weight: bold;
		font-size: 0.9rem;
	}

	.vehicle-years {
		padding-left: 1rem; /* Add some padding to the list of vehicle years */
	}

	.vehicle-year {
		margin-bottom: 0.25rem;
	}

	.year-label {
		font-size: 0.8rem;
	}

	.vehicle-vin {
		width: 88%;
	}

	.vin-button {
		display: block;
		padding: 0.25em 0.5em;
		background-color: ${Colors.Snow};
		border: 1px solid ${Colors.LightGray};
		cursor: pointer;
		color: ${Colors.SlateGray};
		font-size: 0.8rem;
		text-align: left;
		width: 100%;
	}
`;

const ToggleButton = styled.button`
	border: none;
	background: none;
	padding: 0.25rem 0.5rem;
	cursor: pointer;
	color: ${Colors.SlateGray};
`;

export const VehicleTree = () => {
	const [expandedModels, setExpandedModels] = useState<{ [key: string]: boolean }>({});
	const [expandedYears, setExpandedYears] = useState<{ [key: string]: boolean }>({});
	const { vehicleList, setSelectedVehicle } = useContext(VehicleContext);

	const buildVehicleGroups = (vehicles: UserVehicle[]): VehicleGroup[] => {
		const groups: VehicleGroup[] = [];

		vehicles.forEach((vehicle) => {
			const makeIndex = groups.findIndex((group) => group.make === vehicle.make);

			if (makeIndex === -1) {
				const newGroup: VehicleGroup = {
					make: vehicle.make,
					models: {
						[vehicle.model]: {
							[vehicle.year]: [vehicle.vin],
						},
					},
				};
				groups.push(newGroup);
			} else {
				const group = groups[makeIndex];
				if (group.models[vehicle.model]) {
					if (group.models[vehicle.model][vehicle.year]) {
						group.models[vehicle.model][vehicle.year].push(vehicle.vin);
					} else {
						group.models[vehicle.model][vehicle.year] = [vehicle.vin];
					}
				} else {
					group.models[vehicle.model] = {
						[vehicle.year]: [vehicle.vin],
					};
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

	const handleVinButtonClick = (vin: string[]) => {
		const selectedVehicle = vehicleList.find((vehicle) => vehicle.vin === vin[0]);
		if (selectedVehicle) {
			setSelectedVehicle(selectedVehicle);
		}
	};

	const vehicleGroups = buildVehicleGroups(vehicleList);

	return (
		<StyledTree className='sbar'>
			<ul className='vehicle-groups'>
				{vehicleGroups.map((group, index) => (
					<li key={group.make} className='vehicle-make'>
						<ToggleButton onClick={() => toggleGroup(index)}>
							{expandedGroups[index] ? '▼' : '►'} <h3 className='make-name'>{group.make}</h3>
						</ToggleButton>
						{expandedGroups[index] && (
							<ul className='vehicle-models'>
								{Object.entries(group.models).map(([model, data]) => (
									<li key={model} className='vehicle-model'>
										<ToggleButton onClick={() => toggleModel(model)}>
											{expandedModels[model] ? '▼' : '►'} <h4 className='model-name'>{model}</h4>
										</ToggleButton>
										{expandedModels[model] && (
											<ul className='vehicle-years'>
												{Object.entries(data).map(([year, vin]) => (
													<li key={`${model}-${year}`} className='vehicle-year'>
														<span className='year-label'>
															<ToggleButton onClick={() => toggleYear(`${model}-${year}`)}>
																{expandedYears[`${model}-${year}`] ? '▼' : '►'} {year}
															</ToggleButton>
														</span>
														{expandedYears[`${model}-${year}`] && (
															<ul>
																{vin.map((vinNumber) => (
																	<li key={vinNumber} className='vehicle-vin'>
																		<button
																			className='vin-button'
																			onClick={() => handleVinButtonClick([vinNumber])}
																		>
																			VIN: {vinNumber}
																		</button>
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
						)}
					</li>
				))}
			</ul>
		</StyledTree>
	);
};
