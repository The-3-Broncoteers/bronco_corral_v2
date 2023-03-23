import { Prisma, PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { resolve } from 'path';
import { nextTick } from 'process';
import { isDataView } from 'util/types';
import { userRouter } from './src/routes/user.routes';
import { authRouter } from './src/routes/user.auth.routes';

const app = express();
const port: number = 3001;

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/users', authRouter);

const prisma = new PrismaClient({ log: ['query'] });

app.listen(port, async () => {
	console.log(`Express is listening at http://localhost:${port}\nTesting Prisma Connection...`);

	await prisma
		.$connect()
		.then(
			async () => {
				console.log('Db Connected');
				await prisma.$disconnect();
			},
			async () => {
				console.log('Db connection failed');
			},
		)
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
});
