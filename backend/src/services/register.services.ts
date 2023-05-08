import bcrypt from 'bcrypt';
import { Http500Error } from '../utils/httpErrors/errors/Http500Error';
import { Http409Error } from '../utils/httpErrors/errors/Http409Error';
import { PrismaClient, User } from '@prisma/client';

const db = new PrismaClient({ log: ['error'] });

export const newUser = async (email: string, password: string): Promise<User> => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await db.user.create({
			data: {
				email: email,
				password: hashedPassword,
			},
		});

		return newUser;
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
