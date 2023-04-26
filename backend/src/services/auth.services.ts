import { prisma } from '../../prisma/prisma';
import { Http500Error } from '../utils/httpErrors/errors/Http500Error';
import { Http401Error } from '../utils/httpErrors/errors/Http401Error';
import { TokenData } from '../utils/tokenData';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_DURATION, REFRESH_TOKEN_DURATION } from '../utils/jwtTokenDuration';

export const loginUser = async (email: string, password: string): Promise<TokenData> => {
	try {
		if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
			throw new Http500Error('Missing environment variables');
		}

		const dbUser = await prisma.user.findUnique({ where: { email: email } });

		if (!dbUser) throw new Http401Error('Invalid credentials');

		const isValidPW: boolean = await bcrypt.compare(password, dbUser.password);

		if (isValidPW) {
			const accessToken = jwt.sign({ email: dbUser.email }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: ACCESS_TOKEN_DURATION,
			});

			const refreshToken = jwt.sign({ email: dbUser.email }, process.env.REFRESH_TOKEN_SECRET, {
				expiresIn: REFRESH_TOKEN_DURATION,
			});

			const newToken = await prisma.token.create({
				data: {
					value: refreshToken,
					user: { connect: { id: dbUser.id } },
					type: 'refresh',
				},
			});

			await prisma.user.update({
				where: {
					id: dbUser.id,
				},
				data: {
					tokens: {
						connect: {
							id: newToken.id,
						},
					},
				},
			});

			return { accessToken: accessToken, refreshToken: refreshToken };
		} else {
			throw new Http401Error('Invalid credentials');
		}
	} catch (error) {
		throw error;
	}
};
