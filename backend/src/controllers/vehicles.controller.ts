import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';
import {
	newVehicle,
	allVehicleInfo,
	vehicleDeleter,
	vehicleInfo,
} from '../services/vehicles.services';

/*
Fake vins to play with
JTHFF2C26B2515141
5TFUW5F13CX228552
KMHDU4ADXAU832403
1GNDS13S132266223
1FVACWDU1BHBB3474
*/
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
	req: Request<{}, {}, { id: number; auth: any }>,
	res: Response,
) => {
	const { id, auth } = req.body;

	try {
		const info = await vehicleInfo(id);
		res.send(info);
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};

export const getAllVehicleInfo = async (
	req: Request<{}, {}, { id: string; auth: any }>,
	res: Response,
) => {
	const { id, auth } = req.body;

	try {
		const info = await allVehicleInfo(auth);
		res.send(info);
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};
