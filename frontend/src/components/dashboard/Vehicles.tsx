import styled from 'styled-components';
import { Colors } from '../../utils/Colors';
import { useContext, useState } from 'react';
import AuthContext from '../../context/authProvider';
import { axiosPublic } from '../../config/axiosConfig';
import { VehicleContext } from '../../context/VehicleProvider';

const DashboardContainer = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 0.7em;
	padding: 0.3em 2em 2em 0em;
	background: ${Colors.MintCream};

	span {
		font-size: 1.2em;
		text-align: center;
		color: red;
	}

	.controlSection {
		background-color: ${Colors.MintCream};
		display: flex;
		flex-flow: column nowrap;
	}

	.vin {
		height: 2.2em;
		border-radius: 20px;
		border: solid 2px ${Colors.Blue};
		text-align: center;
		font-size: 175%;
	}

	.buttons {
		margin-top: 0.6em;
		border-top: solid 2px ${Colors.Blue};
		padding-top: 0.6em;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-evenly;
	}

	.buttons button {
		border-radius: 20px;
		border: solid 2px ${Colors.MintCream};
		background-color: ${Colors.Blue};
		width: 15%;
		color: ${Colors.MintCream};
	}

	.view {
		width: 100%;
		flex-grow: 1;
		background-color: #f1fffa;
		border-radius: 20px;
		border: solid 2px #55828b;
		box-shadow: 2px 2px 15px #87bba2;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.view .vehicle-info {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.view .vehicle-info img {
		margin-right: 20px;
		border-radius: 20px;
		border: solid 2px #55828b;
		box-shadow: 2px 2px 15px #87bba2;
		max-width: 300px;
	}

	.view .vehicle-details {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.left-container {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.right-container {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
`;

export const Vehicles = () => {
	const [vin, setVin] = useState('');
	const { auth } = useContext(AuthContext);
	const { vehicleList, setVehicleList } = useContext(VehicleContext);
	const { selectedVehicle } = useContext(VehicleContext);
	const [vehicleImage, setVehicleImage] = useState('');

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

	return (
		<DashboardContainer>
			<div style={{ display: 'flex', flex: 1 }}>
				<div className='left-container'>
					<section className='controlSection'>
						<input
							className='vin'
							placeholder='Enter VIN'
							name='vin'
							onChange={(e) => setVin(e.target.value)}
						/>
						<span></span>
						<section className='buttons'>
							<button onClick={viewVehicle}>View</button>
							<button onClick={createVehicle}>Create</button>
							<button onClick={deleteVehicle}>Delete</button>
						</section>
					</section>
					<section className='view'>
						{selectedVehicle ? (
							<div>
								<h3>Selected Vehicle:</h3>
								<div className='vehicle-info'>
									<img
										src={'http://downloads.innova.com/polk-vehicle-images/CAC20TOT105C0101.jpg'}
										alt={selectedVehicle.make}
									/>
									<div className='vehicle-details'>
										<p>Make: {selectedVehicle.make}</p>
										<p>Model: {selectedVehicle.model}</p>
										<p>Year: {selectedVehicle.year}</p>
										<p>VIN: {selectedVehicle.vin}</p>
									</div>
								</div>
							</div>
						) : (
							<p>No vehicle selected</p>
						)}
					</section>
				</div>
				<div className='right-container'>
					{' '}
					<section className='controlSection'>
						<input
							className='vin'
							placeholder='Enter VIN'
							name='vin'
							onChange={(e) => setVin(e.target.value)}
						/>
						<span></span>
						<section className='buttons'>
							<button onClick={viewVehicle}>View</button>
							<button onClick={createVehicle}>Create</button>
							<button onClick={deleteVehicle}>Delete</button>
						</section>
					</section>
					<section className='view'>
						{selectedVehicle ? (
							<div>
								<h3>Selected Vehicle:</h3>
								<div className='vehicle-info'>
									<img
										src={'http://downloads.innova.com/polk-vehicle-images/CAC20TOT105C0101.jpg'}
										alt={selectedVehicle.make}
									/>
									<div className='vehicle-details'>
										<p>Make: {selectedVehicle.make}</p>
										<p>Model: {selectedVehicle.model}</p>
										<p>Year: {selectedVehicle.year}</p>
										<p>VIN: {selectedVehicle.vin}</p>
									</div>
								</div>
							</div>
						) : (
							<p>No vehicle selected</p>
						)}
					</section>
				</div>
			</div>
		</DashboardContainer>
	);
};
