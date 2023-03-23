import express from 'express';
import { loginUser } from '../controllers/user.controller';
import { deleteRefreshTokens, useRefreshToken } from '../services/user.auth.services';

const router = express.Router();

router.post('/login', loginUser);

router.post('/token', useRefreshToken);

router.delete('/logout', deleteRefreshTokens);

export { router as authRouter };
