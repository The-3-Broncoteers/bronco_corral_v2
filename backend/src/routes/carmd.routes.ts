import express from 'express';
import { getMaintenanceInfo } from '../controllers/carmd.controller';

const router = express.Router();

router.get('/maintenances', getMaintenanceInfo);

export { router as carmdRouter };