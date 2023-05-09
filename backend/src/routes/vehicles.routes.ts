import express from 'express';
import {
	createVehicle,
	deleteVehicle,
	getVehicles,
	getVehicleInfo,
	updateVehicleMilageData,
} from '../controllers/vehicles.controller';

const router = express.Router();

router
	.route('/')
	.get(getVehicles)
	.post(createVehicle)
	//.put()
	.delete(deleteVehicle);

router.route('/:id').get(getVehicleInfo).put(updateVehicleMilageData);

export { router as vehicleRouter };
