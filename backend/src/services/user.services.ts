import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

console.log(process.env.ACCESS_TOKEN_SECRET);

interface User {
	email: string;
	password: string;
}

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

	return await prisma.users.create({
		data: {
			email: useremail,
			password: hashedPassword,
		},
	});
};
