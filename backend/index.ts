import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import bcryptt from "bcrypt";

const bcrypt = require('bcrypt');
const saltRounds = 10;
const burnerPw = 'chickennuggetsaregas';

const app = express();
const port: number = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/create', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const prisma = new PrismaClient({ log: ['query'] });

	const newUser = await prisma.users.create({
		data: {
			email: email,
			password: password,
		},
	});

	res.json({ success: true });
});

app.listen(port, async () => {
	console.log(`Express is listening at http://localhost:${port}`);

	const prisma = new PrismaClient({ log: ['query'] });
	const users = await prisma.users
		.findMany()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	console.log(users);
});

function encryptPw(): void {
	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(burnerPw, salt, function(err, hash) {
			// Store hash in your password DB.
		});
	});
}
