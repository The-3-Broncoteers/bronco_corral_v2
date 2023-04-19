import { HttpStatus } from '../HttpStatus';

export class Http404Error extends HttpStatus {
	constructor(message: string = 'Not Found') {
		super(404, message);
	}
}
