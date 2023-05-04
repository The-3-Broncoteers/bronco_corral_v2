import { Request, Response } from 'express';
import { HttpStatus } from '../utils/httpErrors/HttpStatus';
import { newVehicle } from '../services/vehicles.services';

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
	const { vin, auth } = req.body;
	const vehicle = await newVehicle(vin, auth);

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
