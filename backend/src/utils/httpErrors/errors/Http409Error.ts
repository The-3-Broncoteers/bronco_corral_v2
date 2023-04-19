import { HttpStatus } from '../HttpStatus';

export class Http409Error extends HttpStatus {
	constructor(message: string = 'Conflict in request') {
		super(404, message);
	}
}
