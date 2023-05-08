import { PrismaClient } from '.prisma/client';

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

export const logDeleter = async (id: number) => {
	const deleteLog = await db.maintenanceLog.delete({
		where: {
			id: id,
		},
	});
	return deleteLog;
};

export const logsFetcher = async (id: number) => {
	const logsFetched = await db.maintenanceLog.findUnique({
		where: {
			id: id,
		},
	});
	return logsFetched;
};
