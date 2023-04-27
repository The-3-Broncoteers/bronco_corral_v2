import { Secret } from 'jsonwebtoken';
import { Http401Error } from '../utils/httpErrors/errors/Http401Error';
import { Http403Error } from '../utils/httpErrors/errors/Http403Error';
import { Http500Error } from '../utils/httpErrors/errors/Http500Error';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_DURATION } from '../utils/jwtTokenDuration';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({ log: ['error'] });

export const refreshToken = async (token: string): Promise<{ accessToken: string }> => {
	try {
		const foundToken = await db.token.findUnique({
			where: {
				value: token,
			},
			select: {
				user: {
					select: {
						email: true,
					},
				},
			},
		});

		if (!foundToken) {
			throw new Http403Error('Invalid token');
		}

		const userEmail: string = foundToken.user.email;

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
					expiresIn: ACCESS_TOKEN_DURATION,
				});

				accessToken = newToken;
			},
		);

		return { accessToken };
	} catch (error) {
		if (error instanceof Error) {
			throw new Error('Failed to refresh token.');
		}

		throw error;
	}
};
