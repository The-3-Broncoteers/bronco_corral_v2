import axios from 'axios';
import axiosConfig from '../config/axiosConfig';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	gap: 0.7em;

	button {
		background-color: ${Colors.Charcoal};
		border-style: solid;
		border-radius: 10px;
		border-color: ${Colors.Charcoal};
		color: ${Colors.MintCream};
		height: 3em;
		width: 100%;

		&:hover,
		&:focus,
		&:target {
			background-color: ${Colors.Blue};
			border-color: ${Colors.Blue};
		}
	}

	a {
		text-decoration: none;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;

		input {
			border-style: solid;
			border-radius: 10px;
			border-color: ${Colors.Blue};
			height: 3.5em;
			padding: 5px;
			width: 100%;
		}
	}

	.form-seperator {
		border-bottom: 1px solid ${Colors.TeaGreen};
		margin: 0px;
		width: 100%;
	}

	.signup-container {
		position: relative;
		width: 100%;
		height: 3em;

		a {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 10px;
			background-color: ${Colors.Cambridge};
			color: ${Colors.MintCream};
			width: 100%;
			height: 3em;
			line-height: 3em;
			text-align: center;
		}
	}
`;

const addToLogEndPoint: string = 'user/log';

const TrackerForm = () => {
	const [formData, setFormData] = useState({
		mileage: '',
		date: '',
		vehicle: '',
		maintenance: '',
	});
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const [vehicle, setVehicle] = useState('');
	const [vehicleList, setVehicleList] = useState([{ name: '', id: '' }]);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		alert('You have submitted the form.');
	};

	useEffect(() => {
		const fetchData = async () => {
			const res = await axiosConfig.get('/carprofile');
			console.log(...res.data);

			setVehicleList(res.data);
		};
		fetchData();
	}, []);

	return (
		<>
			<StyledForm onSubmit={handleSubmit} method='POST' action={addToLogEndPoint}>
				<div className='header'>
					<h1>Maintenance Tracking Portal</h1>
					<h6>View/edit your maintenance logs here</h6>
				</div>
				<div className='form-seperator'></div>
				<select className='form-control' value='car' onChange={handleSelectChange}>
					<option value=''>Select Vehicle</option>
					{vehicleList.map((vehicle) => (
						<option value={vehicle.name} key={vehicle.id}>
							{vehicle.name}
						</option>
					))}
				</select>

				<select className='form-control'>
					<option value=''>Select Maintenance</option>
				</select>
				<div className='form-seperator'></div>
				<div className='form-group'>
					<label hidden>Enter mileage</label>
					<input
						type='mileage'
						placeholder='Enter mileage'
						name='mileage'
						onChange={handleChange}
					></input>
				</div>

				<div className='form-group'>
					<label hidden>Enter date</label>
					<input type='date' placeholder='Enter date' name='date' onChange={handleChange}></input>
				</div>
				<div className='form-seperator'></div>
				<button type='submit'>Update log</button>
			</StyledForm>
		</>
	);
};

export default TrackerForm;
