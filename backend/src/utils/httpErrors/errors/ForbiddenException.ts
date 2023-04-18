import { HttpError } from '../httpError';

export class ForbiddenException extends HttpError {
	constructor(message: string) {
		super(403, message);
	}
}
