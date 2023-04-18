import { prisma } from '../../prisma/prisma';
import { InternalServerError } from '../utils/httpErrors/errors/InternalServerError';
import { UnauthorizedError } from '../utils/httpErrors/errors/UnauthorizedError';
import { TokenData } from '../utils/tokenData';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (email: string, password: string): Promise<TokenData> => {
	try {
		if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
			throw new InternalServerError('Missing environment variables');
		}

		const dbUser = await prisma.user.findUnique({ where: { email: email } });

		if (!dbUser) {
			throw new UnauthorizedError('Invalid credentials');
		}

		const isValidPW: boolean = await bcrypt.compare(password, dbUser.password);

		if (isValidPW) {
			const accessToken = jwt.sign({ email: dbUser.email }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: '5m',
			});

			const refreshToken = jwt.sign({ email: dbUser.email }, process.env.REFRESH_TOKEN_SECRET, {
				expiresIn: '1d',
			});

			//TODO save tokens into db

			return { accessToken: accessToken, refreshToken: refreshToken };
		} else {
			throw new UnauthorizedError('Invalid credentials');
		}
	} catch (error) {
		throw error;
	}
};
