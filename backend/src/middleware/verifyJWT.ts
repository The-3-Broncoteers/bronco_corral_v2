import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader || !process.env.ACCESS_TOKEN_SECRET) {
		return res.sendStatus(401);
	}

	console.log('Auth header: ' + authHeader);
	const token = authHeader && authHeader.replace(/^Bearer\s+/, '');
	console.log('token: ' + token);

	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(error: jwt.VerifyErrors | null, decodedData: any) => {
			if (error) return res.sendStatus(403);
			req.body.user = decodedData.email;
			console.log('Access token decoded successfully');
			next();
		},
	);
};
