import { PrismaClient } from '@prisma/client';
import { userRouter } from './src/routes/user.routes';
import { authRouter } from './src/routes/user.auth.routes';
import { carmdRouter } from './src/routes/carmd.routes';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port: number = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/maintenance', carmdRouter);

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
				await prisma.$disconnect();
			},
		)
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});
});
