import styled from 'styled-components';
import { Colors } from '../../utils/Colors';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/authProvider';
import { axiosPublic } from '../../config/axiosConfig';
import { VehicleContext } from '../../context/VehicleProvider';

const DashboardContainer = styled.div`
	display: flex;
    height: 100%;
	flex-flow: row nowrap:
	gap: 0.1em;
	padding: 0.5em 0.5em;
	background: ${Colors.MintCream};
    max-width: 75vw;

	.left-container,
	.right-container {
		width: 50%;
		max-width: 37.5vw;
        height: 100%;
	}

	.left-container {
		padding: 10px;
        display: flex;
        flex-flow: column nowrap;

		p {
			word-wrap: break-word;
			overflow-wrap: break-word;
		}

		.view {
			height: 65%;
            max-height: 65%;
            margin: .3em;
            padding-top: .3em;
            padding-right: .7em;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
            border-radius: 20px;
            border: solid 2px ${Colors.Blue};
            box-shadow: 2px 2px 15px ${Colors.Cambridge};

			.vehicle-img {
				max-height: 100%;
                border-radius: 20px;
				object-fit: contain;
			}

			.vehicle-details {
				overflow-y: auto;
				overflow-x: auto;
                height: 98%;
				padding: 0px .7em;
                overflow-wrap: break-word;
			}
		}

        .view-left {
            display: flex;
            flex-flow column nowrap;
            width: 50%;
            height: 100%;
            padding: 0em 0em .5em .5em;
        }

        .mile-control {
            display: flex;
            flex-flow column nowrap;
            height: 70%;
            width: 100%;
            justify-content: space-evenly;
            text-align: center;

            label {
                padding-right: .7em;
            }
        }

        .alerts {
            margin: .3em;
            height: 100%;
            border-radius: 20px;
            border: solid 2px ${Colors.Blue};
            box-shadow: 2px 2px 15px ${Colors.Cambridge};
        }

        .controls {
            display: flex;
            justify-content: center;
            padding-bottom: .5em;
            margin-bottom: .5em;
            border-bottom: 2px solid ${Colors.TeaGreen};
        }

        .input-wrapper {
            display: flex;
            flex-flow: row nowrap;
            width: 100%;
            margin: 0em;
            padding: 0em;
            justify-content: center;

            input {
                width: 70%;
                padding: 1px 0px 1px 2px;
                border: .15em solid ${Colors.Blue};
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
                border-right: 0;
                text-align: center;

                ::placeholder {
                    text-align: center; 
                }
            }

            button {
                border: .15em solid ${Colors.Blue};
                border-left: 0;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                background-color: ${Colors.Blue};
                color: ${Colors.MintCream};

                :hover {
                    background-color: ${Colors.Charcoal};
                    border: .15em solid ${Colors.Charcoal};
                    border-left: 0;
                }
            }
        }
	}

	.right-container {
		background-color: lightgreen;
		padding: 10px;
	}

    #sbar::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: ${Colors.White};
    }
    
    #sbar::-webkit-scrollbar {
        width: 12px;
        background-color: ${Colors.White};
    }
    
    #sbar::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: ${Colors.DarkBlue};
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
		milage: string;
		avgMilage: string;
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
				const { vin, make, model, year, milage, milesPerDay } = response.data;
				setVehicleList([
					...vehicleList,
					{ vin, make, model, year, milage, avgMilage: milesPerDay },
				]);
				console.log(`on set ${milage} ${milesPerDay}`);
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
								Milage,
								AvgMiles,
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
							} = Results[0];

							setVehicleDetails({
								make: Make || '',
								model: Model || '',
								year: ModelYear || '',
								vin: VIN || '',
								milage: Milage || '',
								avgMilage: AvgMiles || '',
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
					<section className='input-wrapper'>
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
								<div className='mile-control'>
									<div className='milage-control'>
										<label htmlFor='milage'>
											Current est. milage: {' ' + selectedVehicle.milage}
										</label>
										<div className='input-wrapper'>
											<input type='text' id='milage'></input>
											<button type='button' className='miles' onClick={createVehicle}>
												Update
											</button>
										</div>
									</div>
									<div className='avg-milage-control'>
										<label htmlFor='avg-miles'>
											Current est. miles/month: {' ' + selectedVehicle.avgMilage}
										</label>
										<div className='input-wrapper'>
											<input type='text' id='avg-miles'></input>
											<button type='button' className='avg-miles' onClick={createVehicle}>
												Update
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className='vehicle-details' id='sbar'>
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
										</>
									)}
								</ul>
							</div>
						</>
					) : (
						<p>Select a vehicle in your tree to the left, or add one above if you have none!</p>
					)}
				</section>
				<section className='alerts'>alerts</section>
			</section>
			<section className='right-container view'>
				<section className='controlSection'>Placeholder</section>
			</section>
		</DashboardContainer>
	);
};
