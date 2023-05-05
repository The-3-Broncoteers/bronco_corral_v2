import { PrismaClient, Vehicle } from '@prisma/client';
import axios from 'axios';

interface VehicleData {
	make: string;
	model: string;
	year: number;
}

const db = new PrismaClient();

export const newVehicle = async (vin: string, auth: any) => {
	try {
		let res: VehicleData = <VehicleData>{};

		await axios
			.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`)
			.then((response) => {
				console.log(response.data);
				res.make = response.data.Results[0].Make;
				res.model = response.data.Results[0].Model;

				const yearString = response.data.Results[0].ModelYear.replaceAll('"', '');

				res.year = parseInt(yearString);
			});

		let vehicle: Vehicle = await getVehicle(res);

		const maintenance = await db.maintenance.create({
			data: {
				vehicleId: vehicle.id,
				dueMileage: 3000,
				description: 'Oil Change',
			},
		});

		return res;
	} catch (error) {
		console.log(error);
	}
};

async function getVehicle(res: VehicleData) {
	let vehicle: Vehicle | null = await db.vehicle.findFirst({
		where: {
			make: res.make,
			model: res.model,
			year: res.year,
		},
	});

	if (!vehicle) {
		vehicle = await db.vehicle.create({
			data: {
				year: res.year,
				make: res.make,
				model: res.model,
			},
		});
	}

	return vehicle;
}
