import { createVehicle, getVehicles } from '../controllers/carprofile.controller';
import express from 'express';

const router = express.Router();

router.route('/').post(createVehicle).get(getVehicles);

export { router as carProfileRouter };
