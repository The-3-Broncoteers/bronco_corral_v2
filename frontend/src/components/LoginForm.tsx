import axiosConfig from '../config/axiosConfig';
import { useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';
import SignupForm from './SignupForm';
import { validateForm } from '../utils/formUtils';
import { useNavigate } from 'react-router-dom';

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

const loginEndPoint: string = '/auth';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const validationError = validateForm(formData);
		if (validationError) {
			setError(validationError);
			return false;
		}

		setError('');

		try {
			const res = await axiosConfig.post(loginEndPoint, formData, {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});

			//TODO store token
			console.log('data1 ' + res.data.accessToken);

			navigate('/');
		} catch (error) {
			//const axiosError = error as AxiosError;
			//console.log(`Axios error to ${loginEndPoint}. Error Message: ${axiosError.message}`);
			setError('Invalid email or password.');
		}

		//TODO something with errors in case we get any
	};

	return (
		<StyledForm onSubmit={handleSubmit} method='POST' action={loginEndPoint}>
			<div className='form-group'>
				<label hidden>Enter Email</label>
				<input type='email' placeholder='Enter email' name='email' onChange={handleChange}></input>
			</div>

			<div className='form-group'>
				<label hidden>Enter Password</label>
				<input
					type='password'
					placeholder='Enter password'
					name='password'
					onChange={handleChange}
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
