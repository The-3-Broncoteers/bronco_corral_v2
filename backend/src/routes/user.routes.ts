import express from 'express';
import { createNewUser, deleteUserByID, getUserByID } from '../controllers/user.controller';

const router = express.Router();

router.get('/:id', getUserByID);

router.put('/create', createNewUser);

router.delete('/:id', deleteUserByID);

export { router as userRouter };
