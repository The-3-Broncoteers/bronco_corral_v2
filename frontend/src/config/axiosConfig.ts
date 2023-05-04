import axios from 'axios';

const baseURL: string =
	process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3001/api/';

export const axiosPublic = axios.create({
	baseURL: baseURL,
});

export const axiosPrivate = axios.create({
	baseURL: baseURL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
