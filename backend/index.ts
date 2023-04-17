import { PrismaClient } from '@prisma/client';
import { userRouter } from './src/routes/user.routes';
import { authRouter } from './src/routes/user.auth.routes';
import { carmdRouter } from './src/routes/carmd.routes';
import { errorHandler } from './src/middleware/errorHandler';
import { eventLogger } from './src/middleware/eventLogger';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './prisma/prisma';

dotenv.config();

const app = express();
const PORT: string | number = process.env.PORT || 3001;

app.use(eventLogger);
app.use(cors()); //Can use corsOptions for safety. (Prevent unauthorized people from making api requests)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/maintenance', carmdRouter);
app.use(errorHandler);

app.listen(PORT, async () => {
	console.log(`Express is listening on port ${PORT}\nTesting Prisma Connection...`);

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
