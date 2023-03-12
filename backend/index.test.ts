//unit test for endpoint with sample email and password

const request = require('supertest');
const express = require('express');
const app = express();

describe('POST /api/create', () => {
	it('Responds with 200 status and success: true', async () => {
		const response = await request(app).post('/api/create').send({
			email: 'test@example.com',
			password: 'password123',
		});
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ success: true });
	});
});

//do "jest index.test.ts" to run the test
