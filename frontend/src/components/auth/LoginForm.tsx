import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Colors } from '../../utils/Colors';
import SignupForm from './SignupForm';
import AuthContext from '../../context/authProvider';
import { useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../config/axiosConfig';

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

	.form-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 98%;

		.form-seperator {
			flex-grow: 1;
		}

		.forgot-password {
			margin-left: auto;
		}

		.trust-device {
			display: flex;

			input[type='checkbox'] {
				margin-right: 0.3rem;
			}
		}
	}
`;

const loginEndPoint: string = '/auth';

export const LoginForm = () => {
	const navigate = useNavigate();
	const { setAuth, persist, setPersist } = useContext(AuthContext);
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
			const res = await axiosPublic.post(
				loginEndPoint,
				JSON.stringify({ email: email, password: password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				},
			);

			const accessToken = res?.data?.accessToken;
			setAuth({ email: email, password: password, accessToken });
			setEmail('');
			setPassword('');
			navigate('/user/dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	const togglePersist = () => {
		setPersist((prev: any) => !prev);
	};

	useEffect(() => {
		localStorage.setItem('persist', persist);
	}, [persist]);

	return (
		<StyledForm onSubmit={handleSubmit}>
			<div className='form-group'>
				<label hidden>Enter Email</label>
				<input
					type='email'
					name='email'
					placeholder='Email Address'
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>

			<div className='form-group'>
				<label hidden>Enter Password</label>
				<input
					type='password'
					name='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
			</div>

			<button type='submit'>Log In</button>

			<div className='form-footer'>
				<div className='trust-device'>
					<input
						type='checkbox'
						id='trust-device'
						name='trust-device'
						checked={persist}
						onChange={() => setPersist(!persist)}
					/>
					<label htmlFor='trust-device'>Remember me</label>
				</div>
				<a href=''>Forgot Password?</a>
			</div>
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
