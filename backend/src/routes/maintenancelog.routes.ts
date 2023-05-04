import express from 'express';
import { addLog } from '../controllers/maintenancelog.controller';

const router = express.Router();

router.post('/', addLog);

export { router as maintenanceLogRouter };
