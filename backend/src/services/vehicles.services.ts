import { PrismaClient, Vehicle } from '@prisma/client';
import axios from 'axios';

interface VehicleData {
	make: string;
	model: string;
	modelYear: string;
}

const db = new PrismaClient({ log: ['error'] });

export const newVehicle = async (vin: string, auth: any) => {
	try {
		let res: VehicleData = <VehicleData>{};

		await axios
			.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`)
			.then((response) => {
				res.make = JSON.stringify(response.data.Results[0].Make);
				res.model = JSON.stringify(response.data.Results[0].Model);
				res.modelYear = JSON.stringify(response.data.Results[0].ModelYear);
			});

		return res;

		const vehicle: Vehicle | null = await db.vehicle.findFirst({
			where: {
				make: res.make,
				model: res.model,
				year: parseInt(res.modelYear),
			},
		});

		console.log('ok');

		if (vehicle) {
			console.log('im here!');
		} else {
			const newVehicle = await db.vehicle.create({
				data: {
					make: res.make,
					model: res.model,
					year: parseInt(res.modelYear),
				},
			});
			console.log('added one');
		}

		return res;
	} catch (error) {
		console.log(error);
	}
};
