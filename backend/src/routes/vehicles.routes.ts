import express from 'express';
import { createVehicle } from '../controllers/vehicles.controller';

const router = express.Router();

router
	.route('/')
	.get()
	.post(createVehicle)
	//.put(updateUser) //TODO update user
	.delete();

router.route('/:id').get();

export { router as vehicleRouter };
