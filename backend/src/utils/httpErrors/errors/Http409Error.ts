import { HttpError } from '../httpError';

export class Http409Error extends HttpError {
	constructor(message: string = 'Conflict in request') {
		super(404, message);
	}
}
