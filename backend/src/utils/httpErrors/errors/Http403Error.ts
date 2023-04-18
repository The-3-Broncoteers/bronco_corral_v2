import { HttpError } from '../httpError';

export class Http403Error extends HttpError {
	constructor(message: string) {
		super(403, message);
	}
}
