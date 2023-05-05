import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const db = new PrismaClient({ log: ['error'] });

interface VehicleData {
	id?: number;
}

export const logCreator = async (vin: string, mileage: number, desc: string) => {
	let res: VehicleData = <VehicleData>{};

	const vehicleId = await db.userVehicle.findUnique({
		where: {
			vin: vin,
		},
		select: {
			id: true,
		},
	});

	res.id = Number(vehicleId?.id);

	const newLog = await db.maintenanceLog.create({
		data: {
			vehicleId: res.id,
			dueMileage: mileage,
			description: desc,
		},
	});
};
