import styled from 'styled-components';
import { CalendarWidget } from './CalendarWidget';
import { Colors } from '../../utils/Colors';
import { useState } from 'react';
import axios from 'axios';

const DashboardContainer = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 0.7em;
	padding-top: 0.2em;
	padding: 0.3em 2em 2em 0em;
	flex-grow: 2;

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

	const createVehicle = () => {
		axios
			.post('/vehicles', { vin })
			.then((response) => {
				// handle response
			})
			.catch((error) => {
				// handle error
			});
	};

	const editVehicle = () => {
		axios
			.put('/vehicles', { vin })
			.then((response) => {
				// handle response
			})
			.catch((error) => {
				// handle error
			});
	};

	const deleteVehicle = () => {
		axios
			.delete('/vehicles', { data: { vin } })
			.then((response) => {
				// handle response
			})
			.catch((error) => {
				// handle error
			});
	};

	const viewVehicle = () => {
		axios
			.get('/vehicles', { params: { vin } })
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
				<section className='buttons'>
					<button onClick={createVehicle}>Create</button>
					<button onClick={editVehicle}>Edit</button>
					<button onClick={deleteVehicle}>Delete</button>
					<button onClick={viewVehicle}>View</button>
				</section>
			</section>
			<section className='view' />
		</DashboardContainer>
	);
};
