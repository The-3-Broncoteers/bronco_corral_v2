import { Request, Response } from 'express';
import { newUser } from '../services/register.services';
import { UserData } from '../utils/userData';
import { HttpError } from '../utils/httpErrors/httpError';
import { Http400Error } from '../utils/httpErrors/errors/Http400Error';

export const register = async (
	req: Request<{}, {}, UserData>,
	res: Response,
): Promise<Response<any, Record<string, any>>> => {
	const { email, password } = req.body;

	try {
		if (!email || !password) throw new Http400Error('Email and password are required');

		const user = await newUser(email, password);
		return res.send(user);
	} catch (error) {
		if (error instanceof HttpError) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
