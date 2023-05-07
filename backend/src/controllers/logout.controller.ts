import { Request, Response } from 'express';
import { UserData } from '../utils/userData';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';
import { logoutUser } from '../services/logout.services';

export const logout = async (req: Request, res: Response) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.replace(/^Bearer\s+/, '');
		console.log('logging out token:' + token);

		if (!token) return res.status(204);

		await logoutUser(token);

		res.cookie('jwt', '', { expires: new Date(0) });
		return res.redirect('/');
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
