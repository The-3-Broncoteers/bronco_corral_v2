import { getVehicles } from '../controllers/carprofile.controller';
import express from 'express';

const router = express.Router();

router.route('/').get(getVehicles);

export { router as carProfileRouter };
