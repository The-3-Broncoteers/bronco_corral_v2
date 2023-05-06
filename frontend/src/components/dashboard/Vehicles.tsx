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
	flex-grow: 2;
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
	}
`;

export const Vehicles = () => {
	const [vin, setVin] = useState('');
	const { auth } = useContext(AuthContext);
	const { vehicleList, setVehicleList } = useContext(VehicleContext);
	const { selectedVehicle } = useContext(VehicleContext);

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

	return (
		<DashboardContainer>
			<section className='controlSection'>
				<input
					className='vin'
					placeholder='Enter VIN'
					name='vin'
					onChange={(e) => setVin(e.target.value)}
				/>
				<span></span> {/* TODO, make this sya invalid vin if needed.     Invalid VIN */}
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
						<p>Make: {selectedVehicle.make}</p>
						<p>Model: {selectedVehicle.model}</p>
						<p>Year: {selectedVehicle.year}</p>
						<p>VIN: {selectedVehicle.vin}</p>
					</div>
				) : (
					<p>No vehicle selected</p>
				)}
			</section>
		</DashboardContainer>
	);
};
