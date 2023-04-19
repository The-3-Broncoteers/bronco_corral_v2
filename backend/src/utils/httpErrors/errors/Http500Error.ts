import { HttpStatus } from '../HttpStatus';

export class Http500Error extends HttpStatus {
	constructor(message: string = 'Internal Server Error') {
		super(500, message);
	}
}
