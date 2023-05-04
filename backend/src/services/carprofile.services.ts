import axios from 'axios';
import { env } from 'process';

import { getMaintenances } from './carmd.services';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({ log: ['error'] });

export const vehicleCreater = async (vin: string, user: string) => {
	const url = `http://api.carmd.com/v3.0/decode?vin=${vin}`;
	const res = await axios.get(url, {
		headers: {
			'content-type': 'application/json',
			authorization: env.CARMD_TOKEN_SECRET2,
			'partner-token': env.CARMD_PARTNER_TOKEN_SECRET2,
		},
	});

	// const maintUrl = `https://api.carmd.com/v3.0/maint?vin=${vin}&mileage=20000`;
	// const resMaintInfo = await axios.get(maintUrl, {
	// 	headers: {
	// 		'content-type': 'application/json',
	// 		authorization: env.CARMD_TOKEN_SECRET2,
	// 		'partner-token': env.CARMD_PARTNER_TOKEN_SECRET2,
	// 	},
	// });

	const userTest: string = 'tester@test.com';
	const year = res.data.data.year;
	const make = res.data.data.make;
	const model = res.data.data.model;

	let vehicleId: number = 0;

	await db.userVehicle
		.create({
			data: {
				vin: vin,
				year: year,
				make: make,
				model: model,
				userEmail: userTest,
				milage: '50000',
				milesPerDay: '100',
			},
		})
		.then(
			(response) => {
				vehicleId = response.id;
				console.log('response: ' + vehicleId);
			},
			(error) => {
				console.log('response: ' + error);
			},
		);

	// 	for (let i = 0; i < resMaintInfo.data.data.length; i++) {
	// 		console.log('test');
	// 		const maintType: string = resMaintInfo.data.data[i].desc;
	// 		console.log(maintType);
	// 		await db.maintenance
	// 			.create({
	// 				data: {
	// 					vehicleId: vehicleId,
	// 					description: maintType,
	// 					dueMileage: 0,
	// 				},
	// 			})
	// 			.then(
	// 				(response) => {
	// 					console.log(response.description);
	// 				},
	// 				(error) => {
	// 					console.log('fail');
	// 				},
	// 			);
	// 	}
};

export const fetchVehicles = async (user: string) => {
	console.log('user: ' + user);
	const userTest: string = 'tester@test.com';

	const vehicles = await db.userVehicle.findMany({
		where: {
			userEmail: userTest,
		},
		select: {
			id: true,
			year: true,
			make: true,
			model: true,
		},
	});

	console.log('number of vehicles: ' + vehicles.length);
	return vehicles;
};
