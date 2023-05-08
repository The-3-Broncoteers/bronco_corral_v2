import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';
import { logoutUser } from '../services/logout.services';

export const logout = async (req: Request, res: Response) => {
	try {
		const cookies = req.cookies;
		if (!cookies?.jwt) return res.sendStatus(204);
		const refreshToken = cookies.jwt;

		await logoutUser(refreshToken);

		return res.redirect('/');
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
