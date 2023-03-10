import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import bcryptt from "bcrypt";

const bcrypt = require('bcrypt');
const saltRounds = 10;
const burnerPw = 'chickennuggetsaregas';

const app = express();
app.use(cors());
app.use(express.json());

const port: number = 3001;

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

app.listen(port, () => {
	console.log(`Express is listening at http://localhost:${port}`);

	const prisma = new PrismaClient({ log: ['query'] });
	async function main() {
		const users = await prisma.users.findMany();
		console.log(users);
	}

	try {
		main()
			.then(async () => {
				await prisma.$disconnect();
			})
			.catch(async (e) => {
				console.error(e);
				await prisma.$disconnect();
				process.exit(1);
			});
	} catch (error) {
		console.log(error);
	}
});

function encryptPw(): void {
	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(burnerPw, salt, function(err, hash) {
			// Store hash in your password DB.
		});
	});
}
