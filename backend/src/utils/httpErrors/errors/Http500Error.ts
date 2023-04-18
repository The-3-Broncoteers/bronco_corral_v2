import { HttpError } from '../httpError';

export class Http500Error extends HttpError {
	constructor(message: string = 'Internal Server Error') {
		super(500, message);
	}
}
