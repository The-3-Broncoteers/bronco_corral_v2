import { User } from '.prisma/client';
import { db } from '../../prisma/db';
import { Http404Error } from '../utils/httpErrors/errors/Http404Error';
import { Http500Error } from '../utils/httpErrors/errors/Http500Error';

export const getAllUsers = async (): Promise<User[]> => {
	try {
		return await db.user.findMany();
	} catch (error) {
		throw new Http500Error(`Error getting all users: ${(error as Error).message}`);
	}
};

export const updateUserByID = async (userID: number) => {
	//TODO
};

export const deleteUserByID = async (userId: number): Promise<User> => {
	try {
		const deletedUser = await db.user.delete({
			where: {
				id: userId,
			},
		});
		return deletedUser;
	} catch (error) {
		if (error instanceof Error) {
			throw new Http500Error(`Error deleting user with ID ${userId}: ${error.message}`);
		} else {
			throw new Http500Error(`Unknown error deleting user with ID ${userId}`);
		}
	}
};
export const getUserByID = async (userID: number): Promise<User | null> => {
	try {
		return await db.user.findUnique({ where: { id: userID } });
	} catch (error) {
		if (error instanceof Error) {
			throw new Http404Error(`Failed to retrieve user with ID: ${userID}.`);
		} else {
			throw new Http500Error(`Unknown error retrieving user with ID ${userID}`);
		}
	}
};
