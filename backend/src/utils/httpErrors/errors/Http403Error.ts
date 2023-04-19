import { HttpStatus } from '../HttpStatus';

export class Http403Error extends HttpStatus {
	constructor(message: string = 'Forbidden') {
		super(403, message);
	}
}
