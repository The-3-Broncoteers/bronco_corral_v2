import axios from 'axios';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const FormInput = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// const handleSubmit = () => {
	// 	console.log(`email: ${email} pw: ${password}`);
	// 	Axios.post('http://localhost:3001/create', {
	// 		email: email,
	// 		password: password,
	// 	}).then(() => {
	// 		console.log('submited');
	// 	});
	// };

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log('submitting');
		try {
			const response = await axios.post('http://localhost:3001/api/create', {
				email,
				password,
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
		console.log('submitted');
	};

	return (
		<Container fluid className='w-25 pt-5'>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter email'
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</Container>
	);
};
