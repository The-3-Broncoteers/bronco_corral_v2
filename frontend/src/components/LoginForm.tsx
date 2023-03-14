import axios from 'axios';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import { SignupForm } from './SignupForm';
import { Colors } from '../utils/Colors';

//TODO set up themes replace Colors with theme color

const StyledLoginForm = styled.div`
	background-color: ${Colors.White};
	box-shadow: 2px 2px 15px 1px ${Colors.Charcoal};
	border-radius: 25px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 20em;
	width: 40%;

	input {
		height: 3.4em;
		width: 16em;
	}

	button {
		background-color: ${Colors.Charcoal};
		border: none;
		color: ${Colors.White};
		width: 100%;
		height: 3em;
		border-radius: 25px;

		&:hover,
		&:focus,
		&:target {
			background-color: ${Colors.SlateGray};
		}
	}

	.forgot-password {
		margin: 0.55em 0em;
		text-align: center;

		a:link {
			text-decoration: none;
		}
	}

	.login-seperator {
		border-bottom: 1px solid #dadde1;
		margin: 0px;
		text-align: center;
		width: 100%;
	}

	.signup-container {
		width: 100%;
		height: 3em;
		margin: 0.6em 0em 0em 0em;
		position: relative;
	}

	.signup-button {
		background-color: ${Colors.Cambridge};
		border-radius: 25px;
		text-align: center;
		text-decoration: none;
		color: ${Colors.White};
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 3em;
		vertical-align: middle;
		line-height: 3em;
	}
`;

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const openSignUpModal = () => {
		setIsOpen(true);
	};

	const closeSignUpModal = () => {
		setIsOpen(false);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			const response = await axios.put('http://localhost:3001/users/create', {
				email,
				password,
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<StyledLoginForm>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label hidden>Email address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter email'
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label hidden>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</Form.Group>
				<button type='submit'>Log In</button>
				<div className='forgot-password'>
					<a href=''>Forgot Password?</a>
				</div>
				<div className='login-seperator'></div>
				<div className='signup-container'>
					<a role={'button'} onClick={openSignUpModal} className='signup-button'>
						Create a new account
					</a>
					<SignupForm isOpen={isOpen} onClose={closeSignUpModal}></SignupForm>
				</div>
			</Form>
		</StyledLoginForm>
	);
};
