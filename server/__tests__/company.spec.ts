import request from 'supertest';
import { app } from '../src/app';
import database from './utils/database';
import User from '../src/app/models/user';

database('endpoint-Company');

describe('Company Controller', () => {
  it('Should return status 201', async () => {
    const user = await User.create({ email: 'test@test' });
    console.log(user);
    const response = await request(app)
      .post('/company')
      .send({ name: 'company 1', assignedTo: user._id });

    expect(response.status).toBe(201);
  });

  it('should return status 400 when the user name is not provided', async () => {
    const response = await request(app).post('/company');

    expect(response.status).toBe(400);
  });
});
