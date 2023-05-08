import { Http409Error } from '../utils/httpErrors/errors/Http409Error';
import { Http500Error } from '../utils/httpErrors/errors/Http500Error';
import { PrismaClient } from '.prisma/client';

const db = new PrismaClient({ log: ['error'] });

export const logoutUser = async (token: string) => {
	try {
		const dbToken = await db.token.findUnique({ where: { value: token } });

		if (!dbToken) {
			throw new Http500Error('Invalid Token');
		}

		return await db.token.delete({ where: { id: dbToken.id } });
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes('Unique constraint failed on the fields: (`email`)')
		) {
			throw new Http409Error('Email already exists');
		} else {
			throw new Http500Error('Error occurred during password hashing');
		}
	}
};
