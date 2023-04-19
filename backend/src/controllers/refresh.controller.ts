import { Request, Response } from 'express';
import { UserData } from '../utils/userData';
import { refreshToken } from '../services/refresh.services';
import { HttpError } from '../utils/httpErrors/httpError';
import { Http401Error } from '../utils/httpErrors/errors/Http401Error';

export const refresh = async (
	req: Request<{}, {}, UserData>,
	res: Response,
): Promise<Response<any, Record<string, any>>> => {
	try {
		const cookies = req.cookies;

		if (!cookies?.jwt) throw new Http401Error('JWT cookie not found');

		const accessToken = await refreshToken(cookies.jwt);
		return res.json(accessToken);
	} catch (error) {
		if (error instanceof HttpError) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
