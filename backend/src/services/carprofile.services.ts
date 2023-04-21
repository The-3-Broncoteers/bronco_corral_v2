import axios from 'axios';
import { env } from 'process';
import { prisma } from '../../prisma/prisma';
import { getMaintenances } from './carmd.services';

export const vehicleCreater = async (vin: string) => {
	const url = `http://api.carmd.com/v3.0/decode?vin=${vin}`;
	// const res = await axios.get(url, {
	// 	headers: {
	// 		'content-type': 'application/json',
	// 		authorization: env.CARMD_TOKEN_SECRET1,
	// 		'partner-token': env.CARMD_PARTNER_TOKEN_SECRET1,
	// 	},
	// });

	// const year = res.data.data.year;
	// const make = res.data.data.make;
	// const model = res.data.data.model;

	// // another api call to get maintenances?
	// const maintenances: string[] = [];

	// // await prisma.vehicle.create({
	// // 	data: {
	// // 		vin: vin,
	// // 		year: year,
	// // 		make: make,
	// // 		model: model,
	// // 		maintenances: maintenances,
	// // 	},
	// // });
};

export const fetchVehicles = async (token: string) => {};
