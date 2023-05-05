import express from 'express';
import { addLog, deleteLog, getLogs } from '../controllers/maintenancelog.controller';
import { add } from 'date-fns';

const router = express.Router();

router
	.route('/')
	.get(getLogs)
	.post(addLog)
	//.put(updateUser) //TODO update user
	.delete(deleteLog);

export { router as maintenanceLogRouter };
