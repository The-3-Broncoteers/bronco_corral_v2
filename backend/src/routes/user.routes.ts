import express from 'express';
import { createNewUser, deleteUserByID, getUserByID, loginUser } from '../controllers/user.controller';
import { deleteRefreshTokens, useRefreshToken } from '../services/user.services';

const router = express.Router();

router.get('/:id', getUserByID);

router.put('/create', createNewUser);

router.post('/login', loginUser);

router.post('/token', useRefreshToken);

app.delete('/logout', deleteRefreshTokens)

router.delete('/:id', deleteUserByID);

export { router as userRouter };