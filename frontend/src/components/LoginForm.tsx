import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

//TODO set up themes replace siteColors with theme color
const tempColor: string = '#422407';

const StyledLoginForm = styled.div`
	background-color: white;
	box-shadow: 2px 2px 15px 1px ${tempColor};
	border-radius: 25px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 55%;
	width: 18em;

	input {
		height: 3.4em;
		width: 16em;
	}

	button {
		background-color: ${tempColor};
		border-color: ${tempColor};
		width: 100%;
		height: 3em;

		&:hover {
			background-color: #402307;
			border-color: #402307;
		}
	}

	.forgot-password {
		margin: 0.55em 0em;

		a:link {
			text-decoration: none;
		}
	}
`;

const LoginButton = styled(Button)``;

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
				<LoginButton type='submit'>Log In</LoginButton>
			</Form>
			<div className='forgot-password'>
				<a href=''>Forgot Password?</a>
			</div>
		</StyledLoginForm>
	);
};
