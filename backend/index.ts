import { userRouter } from './src/routes/user.routes';

import { errorHandler } from './src/middleware/errorHandler';
import { eventLogger } from './src/middleware/eventLogger';
import { authRouter } from './src/routes/auth.routes';
import { registerRouter } from './src/routes/register.routes';
import { verifyJWT } from './src/middleware/verifyJWT';
import { logoutRouter } from './src/routes/logout.routes';
import { refreshRouter } from './src/routes/refresh.routes';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import { vehicleRouter } from './src/routes/vehicles.routes';
import { maintenanceLogRouter } from './src/routes/maintenancelog.routes';
import { carmdRouter } from './src/routes/carmd.routes';

dotenv.config();

const app = express();
const PORT: string | number = process.env.PORT || 3001;
const db = new PrismaClient({ log: ['error'] });

app.use(eventLogger);
app.use(
	cors({
		origin: true,
		credentials: true,
	}),
); //Can use cors options for safety. (Prevent unauthorized people from making api requests)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/register', registerRouter);
app.use('/api/auth', authRouter);
app.use('/api/refresh', refreshRouter);
app.use('/api/logout', logoutRouter);
//app.use(verifyJWT);
app.use('/api/users', userRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('api/maintenance', maintenanceLogRouter);
app.use('/api/maintenance', carmdRouter);
app.use(errorHandler);

app.listen(PORT, async () => {
	console.log(`Express is listening on port ${PORT}\nTesting Prisma Connection...`);

	await db
		.$connect()
		.then(
			async () => {
				console.log('Db Connected');
				await db.$disconnect();
			},
			async (reason) => {
				console.log('Db connection failed ' + reason);
				await db.$disconnect();
			},
		)
		.catch(async (e) => {
			console.error(e);
			await db.$disconnect();
			process.exit(1);
		});

	console.log(`Server running!`);
});
