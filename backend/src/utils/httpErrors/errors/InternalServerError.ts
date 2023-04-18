import { HttpError } from '../httpError';

export class InternalServerError extends HttpError {
	constructor(message: string = 'Internal Server Error') {
		super(500, message);
	}
}
