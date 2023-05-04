import { createVehicle, deleteVehicle, getVehicles } from '../controllers/carprofile.controller';
import express from 'express';

const router = express.Router();

router.route('/').post(createVehicle).get(getVehicles).delete(deleteVehicle);

export { router as carProfileRouter };
