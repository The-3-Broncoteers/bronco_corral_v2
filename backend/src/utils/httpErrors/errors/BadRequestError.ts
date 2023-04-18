import { HttpError } from '../httpError';

export class BadRequestError extends HttpError {
	constructor(message: string = 'Bad Request') {
		super(400, message);
	}
}
