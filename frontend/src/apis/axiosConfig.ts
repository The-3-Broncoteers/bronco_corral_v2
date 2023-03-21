import axios from 'axios';

const baseURL: string = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001/api';

export default axios.create({
	baseURL: baseURL,
});