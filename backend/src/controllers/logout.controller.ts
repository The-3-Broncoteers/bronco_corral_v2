import { Request, Response } from 'express';
import { UserData } from '../utils/userData';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';
import { logoutUser } from '../services/logout.services';

export const logout = async (req: Request<{}, {}, UserData>, res: Response) => {
	try {
		const cookies = req.cookies;

		if (!cookies?.jwt) {
			return res.status(204);
		}

		await logoutUser(cookies.jwt);

		res.cookie('jwt', '', { expires: new Date(0) });
		return res.redirect('/');
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
