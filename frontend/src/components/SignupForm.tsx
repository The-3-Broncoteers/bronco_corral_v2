import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';

//TODO Media Queries for css
//TODO Themeing

const StyledModal = styled(Modal)`
	.modal-header {
		border: none;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		gap: 0.7em;
		width: 80%;
		margin: auto;

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

		.login-container {
			position: relative;
			width: 100%;
			height: 3em;
			margin-bottom: 1em;

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
	}
`;

interface SignupFormProps {
	isOpen: boolean;
	onClose: () => void;
}

const loginEndPoint: string = 'http://localhost:3001/users/create';

const SignupForm = ({ isOpen, onClose }: SignupFormProps) => {
	if (!isOpen) return null;

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const handleLoginButton = () => {
		onClose();

		navigate('/');
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
		<StyledModal show={isOpen} onHide={onClose} backdrop='static' keyboard={false}>
			<Modal.Header closeButton></Modal.Header>
			<form onSubmit={handleSubmit}>
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

				<div className='form-group'>
					<label hidden>Re-enter Password</label>
					<input
						type='password'
						placeholder='Re-enter password'
						onChange={(event) => {
							setConfirmPassword(event.target.value);
						}}
					></input>
				</div>

				<button type='submit'>Sign Up</button>
				<div className='form-seperator'></div>

				<div className='login-container'>
					<a role={'button'} onClick={handleLoginButton} className='login-button'>
						Login to existing account
					</a>
				</div>
			</form>
		</StyledModal>
	);
};

export default SignupForm;
