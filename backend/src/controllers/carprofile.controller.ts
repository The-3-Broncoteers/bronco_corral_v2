import { Request, Response } from 'express';
import { Header } from 'jwt-promisify';
import { vehicleCreater, fetchVehicles } from '../services/carprofile.services';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';

export const getVehicles = async (req: Request, res: Response): Promise<void> => {
	try {
		const vehicles = await fetchVehicles(req.body.user);
		res.send(vehicles);
	} catch (error) {
		res.status(404).json({ message: (error as HttpStatus).message });
	}
};
