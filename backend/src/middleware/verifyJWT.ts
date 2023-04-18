import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader || !process.env.ACCESS_TOKEN_SECRET) {
		return res.sendStatus(401);
	}

	console.log(authHeader);

	const token = authHeader.split(' ')[1];

	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(error: jwt.VerifyErrors | null, decodedData: any) => {
			if (error) return res.sendStatus(403);
			req.body.user = decodedData;
			next();
		},
	);
};
