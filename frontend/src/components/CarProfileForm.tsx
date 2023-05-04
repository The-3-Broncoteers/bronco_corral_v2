import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { axiosPublic } from '../config/axiosConfig';
import AuthContext from '../context/authProvider';
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

const createCarProfileEndPoint: string = '/carprofile';

const CarProfileForm = () => {
	const [formData, setFormData] = useState({
		VIN: '',
	});
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { auth } = useContext(AuthContext);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// remember to validate form

		setError('');

		try {
			const res = await axiosPublic.post(
				createCarProfileEndPoint,
				JSON.stringify({ ...formData }),
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: auth.accessToken,
					},
				},
			);
		} catch (error) {
			setError('Invalid email or password.');
		}
	};

	return (
		<>
			<StyledForm onSubmit={handleSubmit}>
				<div className='header'>
					<h1>Car Profile Portal</h1>
					<h6>Dont see your vehicle? Create a profile below</h6>
				</div>
				<div className='form-group'>
					<label hidden>Enter VIN</label>
					<input type='VIN' placeholder='Enter VIN' name='VIN' onChange={handleChange}></input>
				</div>
				<div className='signup-container'>
					<button type='submit'>Create with VIN</button>
				</div>
			</StyledForm>
		</>
	);
};

export default CarProfileForm;
