import { Request, Response } from 'express';
import { Http400Error } from '../utils/httpErrors/errors/Http400Error';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';
import { logCreator } from '../services/maintenancelog.services';

export const addLog = async (
	req: Request<{}, {}, { vin: string; auth: any; mileage: number; desc: string }>,
	res: Response,
) => {
	const { vin, mileage, desc } = req.body;

	try {
		const log = await logCreator(vin, mileage, desc);
		res.send(log);
	} catch (error) {
		if (error instanceof HttpStatus) {
			return res.status(error.status).json({ message: error.message });
		}

		return res.status(500).json({ message: 'Something went wrong.' });
	}
};

export const deleteLog = async (req: Request, res: Response) => {};
