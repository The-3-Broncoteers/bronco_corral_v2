import { HttpStatus } from '../HttpStatus';

export class Http401Error extends HttpStatus {
	constructor(message: string = 'Unauthorized') {
		super(401, message);
	}
}
