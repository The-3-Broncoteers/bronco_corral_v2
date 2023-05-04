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

export const vehicleDeleter = async (vehicleId: string) => {
	console.log('id to delete: ' + vehicleId);
	const deleteVehicle = await db.userVehicle
		.delete({
			where: {
				id: parseInt(vehicleId),
			},
		})
		.then(
			(response) => {
				console.log('deleted ID: ' + response.id);
			},
			(error) => {
				console.log('error delete response: ' + error);
			},
		);
};

export const vehicleInfo = async (vehicleId: number, auth: string) => {
	const vehicle = await db.userVehicle.findFirst({
		where: {
			id: vehicleId,
		},
	});
	return vehicle;
};

export const allVehicleInfo = async (auth: string) => {
	const vehicles = await db.userVehicle.findMany({
		where: {
			userEmail: auth,
		},
	});
	return vehicles;
};
