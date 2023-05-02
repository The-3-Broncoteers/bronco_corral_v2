import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({ log: ['error'] });

/**
 * This will check and populate (if its not found) the database tables against the models in the main function
 * cli: npx prisma db seed
 */
async function main() {
	const newUser = await db.user.create({
		data: {
			email: 'danielTest',
			password: 'one',
		},
	});
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
