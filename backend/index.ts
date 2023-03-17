import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import { userRouter } from './src/routes/user.routes';
import { resolve } from 'path';
import { nextTick } from 'process';
import { isDataView } from 'util/types';

require('dotenv').config()

const app = express();
const port: number = 3001;

const users = []

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);

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

// note to self: start moving following code to users/services

// app.post("/", async (req, res) =>  {

// 	const dbUser = await prisma.users.findFirst({
// 		where: { email: req.body.email}
// 	})

// 	if(dbUser == null){
// 		return res.status(400).send('Cannot find user')
// 	}

// 	try {
// 		if(dbUser.password == req.body.password){
// 			res.send('Success')
// 		} else {
// 			res.send('Invalid password')
// 		}
// 	} catch {
// 		res.status(500).send();
// 	}

// 	const email = req.body.email
// 	const password = req.body.password

// 	const user = 
// 	{ email : email,
// 	password: password
// 	}

// 	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
// 	res.json({acessToken: accessToken})
// })

const authenticateToken = (req: any,res: any,next: any) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.sendStatus(401)

	jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err: any, user:any) => {
		if (err) return res.sendStatus(403)
		req.user = user
		next()
	})

}

app.get('/home', authenticateToken, (req,res) => {

})