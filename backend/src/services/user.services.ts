import { PrismaClient } from '@prisma/client';
import { ParamsDictionary } from 'express-serve-static-core';
import bcrypt from 'bcrypt';

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
	const hashedPassword = await bcrypt.hash(req.password, 10);
	const useremail = req.email;

	try {
		return await prisma.users.create({
			data: {
				email: useremail,
				password: hashedPassword,
			},
		});
	} catch (error) {
		console.log(error);
	}
};
