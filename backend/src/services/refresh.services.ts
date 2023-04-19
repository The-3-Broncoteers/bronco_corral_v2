import jwt, { Secret } from 'jsonwebtoken';
import { Http500Error } from '../utils/httpErrors/errors/Http500Error';
import { Http401Error } from '../utils/httpErrors/errors/Http401Error';

export const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
	try {
		//Check token db for the token, if no token found send status 403
		//If token found, get the user email associated with token
		const userEmail = '';

		if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
			throw new Http500Error('Missing environment variables');
		}

		let accessToken: string = '';

		jwt.verify(
			token,
			process.env.REFRESH_TOKEN_SECRET,
			(error: jwt.VerifyErrors | null, decodedData: any) => {
				if (error || userEmail !== decodedData.email) throw new Http401Error();

				const accessTokenSecret: Secret | undefined = process.env.ACCESS_TOKEN_SECRET;

				if (!accessTokenSecret) throw new Http500Error('ACCESS_TOKEN_SECRET is not defined');

				const newToken = jwt.sign({ username: decodedData.username }, accessTokenSecret, {
					expiresIn: '5m',
				});

				accessToken = newToken;
			},
		);

		return { accessToken: accessToken };
	} catch (error) {
		if (error instanceof Error) {
			throw new Error('Failed to refresh token.');
		}

		throw error;
	}
};
