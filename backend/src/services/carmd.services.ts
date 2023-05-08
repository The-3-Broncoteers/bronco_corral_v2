import axios from 'axios';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const authKey = process.env.AUTH_KEY || '';
const token = process.env.TOKEN || '';

const db = new PrismaClient({ log: ['error'] });

export const getMaintenances = async (vin: string, mileage: number) => {
	const apiUrl = `https://api.carmd.com/v3.0/maint?vin=${vin}&mileage=${mileage}`;
	const response = await axios.get(apiUrl, {
		headers: {
			'content-type': 'application/json',
			authorization: authKey,
			'partner-token': token,
		},
	});

	const userTest: string = 'tester@test.com';

	const maintenances = response.data.data.map((maintenance: { desc: any; due_mileage: any }) => {
		return {
			desc: maintenance.desc,
			dueMileage: maintenance.due_mileage,
			userEmail: userTest,
			Vehicle: {
				connect: {
					vin: vin,
				},
			},
		};
	});

	await db.maintenance.createMany({
		data: maintenances,
	});

	return response.data;
};
