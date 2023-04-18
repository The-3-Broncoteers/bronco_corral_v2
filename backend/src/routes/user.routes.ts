import { getUsers, deleteUser, getUser } from '../controllers/user.controller';
import express from 'express';

const router = express.Router();

router
	.route('/')
	.get(getUsers)
	//.put(updateUser) //TODO update user
	.delete(deleteUser);

router.route('/:id').get(getUser);

export { router as userRouter };
