import express from 'express';
import { createNewUser, deleteUserByID, getUserByID, loginUser } from '../controllers/user.controller';

const router = express.Router();

router.get('/:id', getUserByID);

router.put('/create', createNewUser);

router.post('/login', loginUser);

router.delete('/:id', deleteUserByID);

export { router as userRouter };