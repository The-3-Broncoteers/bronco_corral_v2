import { HttpError } from '../httpError';

export class Http400Error extends HttpError {
	constructor(message: string = 'Bad Request') {
		super(400, message);
	}
}
