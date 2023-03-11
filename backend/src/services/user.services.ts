import { PrismaClient } from '@prisma/client';
import { ParamsDictionary } from 'express-serve-static-core';

const prisma = new PrismaClient();

export const queryListOfUsers = async (userID?: number) => {
	if (userID) {
		return await prisma.users.findUniqueOrThrow({ where: { id: userID } }).catch((error) => {
			return `error finding user with ID: ${userID}`;
		});
	}

	return await prisma.users.findMany();
};

export const deleteUser = async (userId: number) => {
	return await prisma.users.delete({
		where: {
			id: userId,
		},
	});
};

export const newUser = async (req: ParamsDictionary) => {
	return await prisma.users.create({
		data: {
			email: req.email,
			password: req.password,
		},
	});
};
