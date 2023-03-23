import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

let refreshTokens: String[] = [];

interface User {
	email: string;
	password: string;
}

const prisma = new PrismaClient();

export const userAuth = async (userEmail: string, userPassword: string, res: Response) => {
	const dbUser = await prisma.users.findFirst({
		where: {
			email: userEmail,
		},
	});

	if (!dbUser) {
		return res.status(400).send('Cannot find user');
	}

	try {
		if (await bcrypt.compare(userPassword, dbUser.password)) {
			const email = userEmail;
			const password = userPassword;

			const user: User = { email: '', password: '' };

			user.email = email;
			user.password = password;

			const accessToken = generateAccessToken(user);
			const refreshToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!);

			res.json({ accessToken: accessToken, refreshToken: refreshToken });
			console.log('Successful authentication for ' + dbUser.email);
			res.send('Success');
		} else {
			res.send('Invalid password');
		}
	} catch {
		res.status(500).send();
	}
};

export const useRefreshToken = async (req: Request, res: Response) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	if (refreshTokens.includes(refreshToken)) return res.sendStatus(403);
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET!,
		(err: jwt.VerifyErrors | null, user: any) => {
			if (err) return res.sendStatus(403);
			const accessToken = generateAccessToken({ email: user.email, password: user.password });
			res.json({ accessToken: accessToken });
		},
	);
};

export const deleteRefreshTokens = async (req: Request, res: Response) => {
	refreshTokens = refreshTokens.filter((token: String) => token !== req.body.token);
	res.sendStatus(204);
};

const generateAccessToken = (user: User) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: jwt.VerifyErrors | null, user: any) => {
		if (err) return res.sendStatus(403);
		req.body.user = user;
		next();
	});
};
