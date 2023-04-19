import { HttpStatus } from '../HttpStatus';

export class Http400Error extends HttpStatus {
	constructor(message: string = 'Bad Request') {
		super(400, message);
	}
}
