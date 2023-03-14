import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.7em;

	.form-group {
		input {
			border-style: solid;
			border-radius: 5px;
			border-color: ${Colors.Blue};
			height: 2.5em;
			padding: 5px;
		}
	}

	.form-seperator {
		border-bottom: 1px solid ${Colors.TeaGreen};
		margin: 0px;
		text-align: center;
		width: 100%;
	}
`;

const loginEndPoint: string = 'http://localhost:3001/users/create';

const LoginFormResponsive = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async () => {
		try {
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
				<label hidden className='email-label'>
					Enter Email
				</label>
				<input
					type='email'
					className='email-input'
					placeholder='Enter email'
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				></input>
			</div>

			<div className='form-group'>
				<label hidden className='password-label'>
					Enter Password
				</label>
				<input
					type='password'
					placeholder='Enter password'
					className='password-input'
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				></input>
			</div>

			<button type='submit'>Log In</button>

			<div className='forgot-password-container'>
				<a href=''>Forgot Password?</a>
			</div>

			<div className='form-seperator'></div>

			<div className='signup-container'>
				<a role={'button'} className='signup-button'>
					Create a new account
				</a>
				{/* <SignupForm isOpen={isOpen} onClose={closeSignUpModal}></SignupForm> */}
			</div>
		</StyledForm>
	);
};

export default LoginFormResponsive;
