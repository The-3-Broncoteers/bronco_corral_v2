import { HttpError } from '../httpError';

export class UnauthorizedException extends HttpError {
	constructor(message: string) {
		super(401, message);
	}
}
