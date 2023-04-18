import { HttpError } from '../httpError';

export class Http404Error extends HttpError {
	constructor(message: string = 'Not Found') {
		super(404, message);
	}
}
