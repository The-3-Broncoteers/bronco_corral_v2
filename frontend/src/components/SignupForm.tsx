import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from '../utils/Colors';
import { validateForm } from '../utils/formUtils';
import axiosConfig from '../apis/axiosConfig';

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

const loginEndPoint: string = '/users/create';

const SignupForm = ({ isOpen, onClose }: SignupFormProps) => {
	if (!isOpen) return null;

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};

	const handleLoginButton = () => {
		onClose();

		navigate('/');
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
			const res = await axiosConfig.post(loginEndPoint, formData);
			navigate('/login'); //you have no idea how long it took me to figure out the behavior i wanted for the form
			//console.log(res.data);
		} catch (error) {
			//const axiosError = error as AxiosError;
			//console.log(`Axios error to ${loginEndPoint}. Error Message: ${axiosError.message}`);
			setError('Invalid email or password.');
		}

		//TODO something with errors in case we get any
	};

	return (
		<StyledModal show={isOpen} onHide={onClose} backdrop='static' keyboard={false}>
			<Modal.Header closeButton></Modal.Header>
			<form onSubmit={handleSubmit} method='POST' action={loginEndPoint}>
				<div className='form-group'>
					<label hidden>Enter Email</label>
					<input
						type='email'
						placeholder='Enter email'
						name='email'
						onChange={handleChange}
					></input>
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

				<div className='form-group'>
					<label hidden>Re-enter Password</label>
					<input
						type='password'
						placeholder='Re-enter password'
						name='confirmPassword'
						onChange={handleChange}
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
