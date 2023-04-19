import { Request, Response } from 'express';
import { deleteUserByID, getAllUsers, getUserByID } from '../services/user.services';
import { HttpError } from '../utils/httpErrors/httpError';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await getAllUsers();
		res.send(users);
	} catch (error) {
		res.status(500).json({ message: (error as HttpError).message });
	}
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await getUserByID(Number(req.params.userID));
		res.send(user);
	} catch (error) {
		res.status(404).json({ message: (error as HttpError).message });
	}
};

// export const updateUser = async (req: Request, res: Response) => {
// 	const user = await updateUserByID(Number(req.params.userId));

// 	res.send(user);
// };

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await deleteUserByID(Number(req.params.userId));
		res.send(user);
	} catch (error) {
		res.status(404).json({ message: (error as HttpError).message });
	}
};
