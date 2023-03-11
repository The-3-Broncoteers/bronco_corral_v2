import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import { userRouter } from './src/routes/user.routes';

const app = express();
const port: number = 3001;

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);

app.listen(port, async () => {
	console.log(`Express is listening at http://localhost:${port}\nTesting Prisma Connection...`);

	const prisma = new PrismaClient({ log: ['query'] });

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
