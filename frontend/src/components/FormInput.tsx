import { useState } from 'react';

export const FormInput = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const data = { email, password };
		fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error(error));
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Email:
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			</label>
			<label>
				Password:
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</label>
			<button type='submit'>Submit</button>
		</form>
	);
};
