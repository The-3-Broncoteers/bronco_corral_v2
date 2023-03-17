import { Request, Response } from 'express';
import { deleteUser, newUser, queryListOfUsers, userAuth } from '../services/user.services';

export const createNewUser = async (req: Request, res: Response) => {
	const user = await newUser(req.body);
	res.send(user);
};

export const getUserByID = async (req: Request, res: Response) => {
	const user = await queryListOfUsers(Number(req.params.userID));
	res.send(user);
};

export const deleteUserByID = async (req: Request, res: Response) => {
	const user = await deleteUser(Number(req.params.userId));
	res.send(user);
};

export const loginUser = async (req: Request, res: Response) => {
	const user = await userAuth(req.body.email, req.body.password, res);
	res.send(user);
};
