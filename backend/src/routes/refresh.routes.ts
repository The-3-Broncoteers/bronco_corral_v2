import express from 'express';
import { refresh } from '../controllers/refresh.controller';

const router = express.Router();

router.get('/', refresh);

export { router as refreshRouter };
