import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';
import SignupForm from './SignupForm';

//TODO Media Queries for css
//TODO Themeing

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

const loginEndPoint: string = 'http://localhost:3001/users/create';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleSubmit = async () => {
		try {
			email.trim().toLowerCase();

			//TODO Check the form input and do pre validation
			return await axios.put(loginEndPoint, {
				email,
				password,
			});
		} catch (error) {
			const axiosError = error as AxiosError;

			if (axiosError.response) {
				console.error(
					`PUT request to ${loginEndPoint} failed with status code ${axiosError.response.status}`,
				);
			} else if (axiosError.request) {
				console.error(`PUT request to ${loginEndPoint} failed with no response received`);
			} else {
				console.error(
					`PUT request to ${loginEndPoint} failed with error message ${axiosError.message}`,
				);
			}
			throw axiosError;
		}
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<div className='form-group'>
				<label hidden>Enter Email</label>
				<input
					type='email'
					placeholder='Enter email'
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				></input>
			</div>

			<div className='form-group'>
				<label hidden>Enter Password</label>
				<input
					type='password'
					placeholder='Enter password'
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				></input>
			</div>

			<button type='submit'>Log In</button>
			<a href=''>Forgot Password?</a>
			<div className='form-seperator'></div>

			<div className='signup-container'>
				<a role={'button'} onClick={handleOpenModal} className='signup-button'>
					Create a new account
				</a>
				<SignupForm isOpen={isOpen} onClose={handleCloseModal} />
			</div>
		</StyledForm>
	);
};

export default LoginForm;
