import request from 'supertest';
import { app } from '../src/app';
import database from './utils/database';

database('endpoint-User');

describe('User Controller', () => {
  it('Should return status 201', async () => {
    const response = await request(app)
      .post('/user')
      .send({ email: 'test@test' });

    expect(response.status).toBe(201);
  });

  it('should return status 400 when the user name is not provided', async () => {
    const response = await request(app).post('/user');
    expect(response.status).toBe(400);
  });
});
