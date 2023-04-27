import { User } from '@prisma/client';
import { Http409Error } from '../utils/httpErrors/errors/Http409Error';
import { Http500Error } from '../utils/httpErrors/errors/Http500Error';
import { db } from '../../prisma/db';

export const logoutUser = async (token: string) => {
	try {
		//TODO check if user has token(s)

		return;
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
