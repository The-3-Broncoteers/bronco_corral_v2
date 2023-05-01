import axios from 'axios';
import { env } from 'process';
import { prisma } from '../../prisma/prisma';
import { getMaintenances } from './carmd.services';

export const vehicleCreater = async (vin: string, user: string) => {
	const url = `http://api.carmd.com/v3.0/decode?vin=${vin}`;
	const res = await axios.get(url, {
		headers: {
			'content-type': 'application/json',
			authorization: env.CARMD_TOKEN_SECRET1,
			'partner-token': env.CARMD_PARTNER_TOKEN_SECRET1,
		},
	});

	const year = res.data.data.year;
	const make = res.data.data.make;
	const model = res.data.data.model;

	await prisma.vehicle.create({
		data: {
			vin: vin,
			year: year,
			make: make,
			model: model,
			userEmail: user,
		},
	});
};

export const fetchVehicles = async (user: string) => {
	console.log('user: ' + user);

	const vehicles = await prisma.vehicle.findMany({
		where: {
			userEmail: user,
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
