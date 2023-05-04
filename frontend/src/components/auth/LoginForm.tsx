import { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/Colors';
import SignupForm from './SignupForm';
import AuthContext from '../../context/authProvider';
import axiosConfig from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

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

export const LoginForm = () => {
	const navigate = useNavigate();
	const { setAuth } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await axiosConfig.post(
				loginEndPoint,
				JSON.stringify({ email: email, password: password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				},
			);

			//console.log(JSON.stringify(res));
			const accessToken = res?.data?.accessToken;
			setAuth({ email: email, password: password, accessToken });
			console.log(JSON.stringify(res?.data));
			setEmail('');
			setPassword('');
			navigate('/user/dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<div className='form-group'>
				<label hidden>Enter Email</label>
				<input
					type='email'
					placeholder='Enter email'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className='form-group'>
				<label hidden>Enter Password</label>
				<input
					type='password'
					placeholder='Enter password'
					name='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
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
