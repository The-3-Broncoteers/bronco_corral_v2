import { Request, Response } from 'express';
import { loginUser } from '../services/auth.services';
import { UserData } from '../utils/userData';
import { Http400Error } from '../utils/httpErrors/errors/Http400Error';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';

export const login = async (
	req: Request<{}, {}, UserData>,
	res: Response,
): Promise<Response<any, Record<string, any>>> => {
	const { email, password } = req.body;

	try {
		if (!email || !password) throw new Http400Error('Email and password are required');

		const userTokens = await loginUser(email, password);

		res.cookie('jwt', userTokens.refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		}); //1 day

		return res.send({ accessToken: userTokens.accessToken });
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
