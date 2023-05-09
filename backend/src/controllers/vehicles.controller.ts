import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';
import {
	newVehicle,
	getAllVehicles,
	vehicleDeleter,
	vehicleInfo,
	updateMilageData,
} from '../services/vehicles.services';

export const createVehicle = async (
	req: Request<{}, {}, { vin: string; auth: any }>,
	res: Response,
) => {
	try {
		const { vin, auth } = req.body;
		const vehicle = await newVehicle(vin, auth);

		return res.send(vehicle);
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};

export const deleteVehicle = async (
	req: Request<{}, {}, { vin: string; auth: any }>,
	res: Response,
) => {
	const { vin, auth } = req.body;
	const vehicle = await vehicleDeleter(vin);

	res.send(vehicle);
	try {
		return res.send();
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};

export const getVehicleInfo = async (
	req: Request<{}, {}, { vin: string; auth: any }>,
	res: Response,
) => {
	const { vin, auth } = req.body;

	try {
		const info = await vehicleInfo(vin);
		res.send(info);
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};

export const getVehicles = async (req: Request, res: Response) => {
	try {
		const data = await getAllVehicles(req.query.email);

		res.send(data);
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};

export const updateVehicleMilageData = async (req: Request, res: Response) => {
	try {
		const { vin, milage, avgMilage } = req.body;

		console.log(`vin: ${vin} milage: ${milage} avgMilage ${avgMilage}`);

		const data = await updateMilageData(vin, milage, avgMilage);

		res.send(data);
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
