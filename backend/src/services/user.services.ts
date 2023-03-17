import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
let refreshTokens: String[] = [];

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

export const userAuth = async (userEmail: string, userPassword: string, res: Response) => {
	const dbUser = await prisma.users.findFirst({
		where: { email: userEmail}
	})

	if(dbUser == null){
		return res.status(400).send('Cannot find user')
	}

	try {
		if(dbUser.password == userPassword){
			res.send('Success')
		} else {
			res.send('Invalid password')
		}
	} catch {
		res.status(500).send();
	}

	const email = userEmail
	const password = userPassword

	const user = 
	{ email : email,
	password: password
	}

	const accessToken = generateAccessToken(user)
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

	res.json({acessToken: accessToken, refreshToken: refreshToken})
};

const generateAccessToken = (user: any) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'})
}

const authenticateToken = (req: any,res: any,next: any) => {

	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err: any, user:any) => {
		if (err) return res.sendStatus(403)
		req.user = user
		next()
	})

}

export const useRefreshToken = async (req: Request, res: Response ) => {
	const refreshToken = req.body.token
	if (refreshToken == null) return res.sendStatus(401)
	if (refreshTokens.includes(refreshToken)) return res.sendStatus(403)
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err: any, user: any) => {
		if (err) return res.sendStatus(403)
		const accessToken = generateAccessToken( { name: user.name})
		res.json({accessToken:accessToken})
	})
}

export const deleteRefreshTokens = async (req: Request, res: Response ) => {
	refreshTokens = refreshTokens.filter((token: any) => token !== req.body.token)
	res.sendStatus(204)
	
}