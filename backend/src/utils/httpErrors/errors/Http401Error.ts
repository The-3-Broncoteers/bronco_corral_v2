import { HttpError } from '../httpError';

export class Http401Error extends HttpError {
	constructor(message: string = 'Unauthorized') {
		super(401, message);
	}
}
