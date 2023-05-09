import express, { Router } from 'express';
import { Response } from 'express';
import supertest from 'supertest';
import request from 'supertest';

const testApp = express();

let token = 'invalidtoken';

describe('Test Logout Route Controller', function () {
	test(' calling /api/maintenancelog route with no authorization', async () => {
		let res = await request(testApp).get('http://localhost:3001/api/maintenance');
		expect(res.statusCode).toBe(404);
	});
});
