import { PrismaClient, Vehicle } from '@prisma/client';
import axios from 'axios';

interface VehicleData {
	make: string;
	model: string;
	year: number;
	milage: string;
	avgMilage: string;
}

const db = new PrismaClient();

export const newVehicle = async (vin: string, auth: any) => {
	try {
		const existingVehicle = await db.userVehicle.findUnique({
			where: {
				vin: vin,
			},
		});

		if (existingVehicle) return existingVehicle;

		let axiosResponse: VehicleData = <VehicleData>{};

		await axios
			.get(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json`)
			.then((response) => {
				axiosResponse.make = response.data.Results[0].Make;
				axiosResponse.model = response.data.Results[0].Model;

				const yearString = response.data.Results[0].ModelYear.replaceAll('"', '');

				axiosResponse.year = parseInt(yearString);
			});

		let vehicleData = <VehicleData>{};
		vehicleData = await getOrCreateVehicle(axiosResponse);

		const newVehicle = await db.userVehicle.create({
			data: {
				vin: vin,
				make: vehicleData.make,
				model: vehicleData.model,
				year: vehicleData.year,
				milage: vehicleData.milage,
				milesPerDay: vehicleData.avgMilage,
				userEmail: auth.email,
			},
		});

		return newVehicle;
	} catch (error) {
		console.log(error);
	}
};

async function getOrCreateVehicle(res: VehicleData) {
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

	const resultingVehicle = { ...vehicle, milage: '0', avgMilage: '0' };

	return resultingVehicle;
}

export const vehicleDeleter = async (vin: string) => {
	const deleteVehicle = await db.userVehicle
		.delete({
			where: {
				vin: vin,
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

export const vehicleInfo = async (vehicleId: string) => {
	const vehicle = await db.userVehicle
		.findUnique({
			where: {
				vin: vehicleId,
			},
		})
		.then(
			(response) => {
				console.log('found record: ' + response?.model);
			},
			(error) => {
				console.log('error: ' + error);
			},
		);

	return vehicle;
};

export const getAllVehicles = async (email: string | any) => {
	const vehicles = await db.userVehicle.findMany({
		where: {
			userEmail: email,
		},
		select: {
			vin: true,
			make: true,
			model: true,
			year: true,
		},
	});

	return vehicles;
};

export const updateMilageData = async (vin: string, milage?: string, avgMilage?: string) => {
	if (!milage && !avgMilage) {
		throw new Error('At least one of milage or avgMilage must be provided');
	}

	const updatedVehicle = await db.$transaction(async (prisma) => {
		const vehicle = await prisma.userVehicle.findUnique({
			where: {
				vin,
			},
		});

		if (!vehicle) {
			throw new Error(`Vehicle with VIN ${vin} not found`);
		}

		const data: { milage?: string; milesPerDay?: string } = {};

		if (milage) {
			data.milage = milage;
		}

		if (avgMilage) {
			data.milesPerDay = avgMilage;
		}

		const updatedVehicle = await prisma.userVehicle.update({
			where: {
				vin,
			},
			data,
		});

		return updatedVehicle;
	});

	return updatedVehicle;
};
