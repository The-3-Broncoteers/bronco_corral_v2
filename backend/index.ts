import { prisma } from './prisma/prisma';
import { userRouter } from './src/routes/user.routes';
import { carmdRouter } from './src/routes/carmd.routes';
import { errorHandler } from './src/middleware/errorHandler';
import { eventLogger } from './src/middleware/eventLogger';
import { authRouter } from './src/routes/auth.routes';
import { registerRouter } from './src/routes/register.routes';
import { verifyJWT } from './src/middleware/verifyJWT';
import { logoutRouter } from './src/routes/logout.routes';
import { refreshRouter } from './src/routes/refresh.routes';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT: string | number = process.env.PORT || 3001;

app.use(eventLogger);
app.use(cors()); //Can use cors options for safety. (Prevent unauthorized people from making api requests)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use(verifyJWT);
app.use('/users', userRouter);
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
