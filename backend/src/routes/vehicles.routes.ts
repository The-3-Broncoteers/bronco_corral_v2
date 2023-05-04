import express from 'express';
import {
	createVehicle,
	deleteVehicle,
	getAllVehicleInfo,
	getVehicleInfo,
} from '../controllers/vehicles.controller';

const router = express.Router();

router
	.route('/')
	.get(getVehicleInfo)
	.post(createVehicle)
	//.put(updateUser) //TODO update user
	.delete(deleteVehicle);

router.route('/:id').get(getAllVehicleInfo);

export { router as vehicleRouter };
