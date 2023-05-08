import styled from 'styled-components';
import { Colors } from '../../utils/Colors';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authProvider';
import { axiosPublic } from '../../config/axiosConfig';
import { VehicleContext } from '../../context/VehicleProvider';

const DashboardContainer = styled.div`
	display: flex;
	height: 100%;
	flex-direction: row;
	gap: 0.1em;
	padding: 0.5em 0.5em;
	background: ${Colors.MintCream};

	.left-container,
	.right-container {
		width: 50%;
		max-width: 50%;

		p {
			word-wrap: break-word;
			overflow-wrap: break-word;
		}
	}

	.left-container {
		background-color: lightblue;
		padding: 10px;

		.view {
			height: 97%;
			display: flex;
			flex-direction: row; /* Change from 'column' to 'row' */
			align-items: flex-start; /* Add this line to align items to the top */

			.vehicle-img {
				width: 50%; /* Reduce the width to 50% */
				max-height: 100%;
				object-fit: contain;
			}

			.vehicle-details {
				overflow-y: auto;
				overflow-x: auto;
				max-height: 50%;
				width: 50%; /* Add this line to set the width to 50% */
				padding-left: 10px; /* Add some padding to the left to separate it from the image */
			}
		}
	}

	.right-container {
		background-color: lightgreen;
		padding: 10px;
	}
`;

export const Vehicles = () => {
	const [vin, setVin] = useState('');
	const { auth } = useContext(AuthContext);
	const { vehicleList, setVehicleList } = useContext(VehicleContext);
	const { selectedVehicle } = useContext(VehicleContext);
	const [vehicleImage, setVehicleImage] = useState('');
	const [vehicleDetails, setVehicleDetails] = useState<{
		make: string;
		model: string;
		year: string;
		vin: string;
		bodyClass: string;
		displacementL: string;
		engineConfiguration: string;
		fuelTypePrimary: string;
		fuelTypeSecondary: string;
		steeringLocation: string;
		plantCountry: string;
		plantState: string;
		series: string;
		doors: string;
		brakeSystemType: string;
		driveType: string;
		engineCylinders: string;
		engineHP: string;
		engineKW: string;
		engineManufacturer: string;
		plantCity: string;
		trim: string;
		transmissionStyle: string;
		transmissionSpeeds: string;
		transmissionControlType: string;
		transmissionManufacturer: string;
	} | null>(null);

	const createVehicle = async () => {
		const isDuplicate = vehicleList.some((vehicle) => vehicle.vin === vin);

		if (isDuplicate) {
			console.log('Vehicle with this VIN already exists!');
			return;
		}

		await axiosPublic
			.post(
				'/vehicles',
				{ vin, auth },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: auth.accessToken,
					},
				},
			)
			.then((response: any) => {
				const { vin, make, model, year } = response.data;
				setVehicleList([...vehicleList, { vin, make, model, year }]);
			})
			.catch((error) => {
				// handle error
			});
	};

	const deleteVehicle = async () => {
		await axiosPublic
			.delete('/vehicles', { data: { vin } })
			.then((response) => {
				setVehicleList(vehicleList.filter((vehicle) => vehicle.vin !== vin));
			})
			.catch((error) => {
				// handle error
			});
	};

	const viewVehicle = async () => {
		await axiosPublic
			.get('/vehicles')
			.then((response) => {
				// handle response
			})
			.catch((error) => {
				// handle error
			});
	};

	// useEffect(() => {
	// 	const fetchVehicleImage = async () => {
	// 		if (selectedVehicle) {
	// 			await axios
	// 				.get('https://api.carmd.com/v3.0/image', {
	// 					headers: {
	// 						'content-type': 'application/json',
	// 						authorization: 'Basic MjUzMmNjZGUtMGM0MC00ZDEzLWFkNTMtMmYwOGRmNjZjMTNm',
	// 						'partner-token': '5a95593fa0b44166b947ac55ec6edcd2',
	// 					},
	// 					params: {
	// 						vin: selectedVehicle.vin,
	// 					},
	// 				})
	// 				.then((response) => {
	// 					console.log(response.data.data.image);
	// 					setVehicleImage(response.data.data.image);
	// 				})
	// 				.catch((error) => {
	// 					// handle error
	// 				});
	// 		}
	// 	};

	// 	fetchVehicleImage();
	// }, [selectedVehicle]);

	useEffect(() => {
		const fetchVehicleDetails = async () => {
			if (selectedVehicle) {
				await axiosPublic
					.get(
						`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${selectedVehicle.vin}?format=json`,
					)
					.then((response) => {
						const { Results } = response.data;

						if (Results && Results.length > 0) {
							const {
								Make,
								Model,
								ModelYear,
								VIN,
								BodyClass,
								DisplacementL,
								EngineConfiguration,
								FuelTypePrimary,
								FuelTypeSecondary,
								SteeringLocation,
								PlantCountry,
								PlantState,
								Series,
								Doors,
								BrakeSystemType,
								DriveType,
								EngineCylinders,
								EngineHP,
								EngineKW,
								EngineManufacturer,
								PlantCity,
								Trim,
								TransmissionStyle,
								TransmissionSpeeds,
								TransmissionControlType,
								TransmissionManufacturer,
							} = Results[0];

							setVehicleDetails({
								make: Make || '',
								model: Model || '',
								year: ModelYear || '',
								vin: VIN || '',
								bodyClass: BodyClass || '',
								displacementL: DisplacementL || '',
								engineConfiguration: EngineConfiguration || '',
								fuelTypePrimary: FuelTypePrimary || '',
								fuelTypeSecondary: FuelTypeSecondary || '',
								steeringLocation: SteeringLocation || '',
								plantCountry: PlantCountry || '',
								plantState: PlantState || '',
								series: Series || '',
								doors: Doors || '',
								brakeSystemType: BrakeSystemType || '',
								driveType: DriveType || '',
								engineCylinders: EngineCylinders || '',
								engineHP: EngineHP || '',
								engineKW: EngineKW || '',
								engineManufacturer: EngineManufacturer || '',
								plantCity: PlantCity || '',
								trim: Trim || '',
								transmissionStyle: TransmissionStyle || '',
								transmissionSpeeds: TransmissionSpeeds || '',
								transmissionControlType: TransmissionControlType || '',
								transmissionManufacturer: TransmissionManufacturer || '',
							});
						}
					})
					.catch((error) => {
						// handle error
					});
			}
		};

		fetchVehicleDetails();
	}, [selectedVehicle]);

	return (
		<DashboardContainer>
			<section className='left-container'>
				<section className='controls'>
					<section className='vin-input'>
						<input
							type='text'
							name='vin'
							placeholder='Enter VIN'
							onChange={(e) => setVin(e.target.value)}
							className='vin-input'
						/>
						<button type='button' className='vin-button' onClick={createVehicle}>
							Add Vehicle
						</button>
					</section>
				</section>
				<section className='view'>
					{selectedVehicle ? (
						<>
							<div className='view-left'>
								<img
									src={'http://downloads.innova.com/polk-vehicle-images/CAC20TOT105C0101.jpg'}
									alt={selectedVehicle.make}
									className='vehicle-img'
								/>
								<div className='miles'></div>
								<div className='avg-miles'></div>
							</div>
							<div className='vehicle-details'>
								<ul>
									<li>Make: {selectedVehicle.make}</li>
									<li>Model: {selectedVehicle.model}</li>
									<li>Year: {selectedVehicle.year}</li>
									<li>VIN: {selectedVehicle.vin}</li>
									{vehicleDetails && (
										<>
											<li>Body Class: {vehicleDetails.bodyClass}</li>
											<li>Displacement: {vehicleDetails.displacementL}</li>
											<li>Engine Configuration: {vehicleDetails.engineConfiguration}</li>
											<li>Fuel Type Primary: {vehicleDetails.fuelTypePrimary}</li>
											<li>Steering Location: {vehicleDetails.steeringLocation}</li>
											<li>Plant Country: {vehicleDetails.plantCountry}</li>
											<li>Plant State: {vehicleDetails.plantState}</li>
											<li>Series: {vehicleDetails.series}</li>
											<li>Doors: {vehicleDetails.doors}</li>
											<li>Brake System Type: {vehicleDetails.brakeSystemType}</li>
											<li>Drive Type: {vehicleDetails.driveType}</li>
											<li>Engine Cylinders: {vehicleDetails.engineCylinders}</li>
											<li>Engine Horsepower: {vehicleDetails.engineHP}</li>
											<li>Engine Kilowatts: {vehicleDetails.engineKW}</li>
											<li>Engine Manufacturer: {vehicleDetails.engineManufacturer}</li>
											<li>Plant City: {vehicleDetails.plantCity}</li>
											<li>Trim: {vehicleDetails.trim}</li>
											<li>Transmission Style: {vehicleDetails.transmissionStyle}</li>
											<li>Transmission Speeds: {vehicleDetails.transmissionSpeeds}</li>
											<li>Transmission Control Type: {vehicleDetails.transmissionControlType}</li>
											<li>Transmission Manufacturer: {vehicleDetails.transmissionManufacturer}</li>
										</>
									)}
								</ul>
							</div>
							<div className='alert'></div>
						</>
					) : (
						<p>Select a vehicle in your tree to the left, or add one above if you have none!</p>
					)}
				</section>
			</section>
			<section className='right-container view'>
				<section className='controlSection'>Placeholder</section>
			</section>
		</DashboardContainer>
	);
};
