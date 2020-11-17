import request from 'supertest';
import { app } from '../src/app';
import database from './utils/database';
import User from '../src/app/models/user';
import Company from '../src/app/models/companys';

database('endpoint-Unit');

describe('Unit Controller', () => {
  it('Should return status 201.', async () => {
    const user = await User.create({ email: 'user' });
    const company = await Company.create({
      name: 'company',
      assignedTo: user._id,
    });
    const response = await request(app)
      .post(`/company/${company._id}/unit`)
      .send({ name: 'unit' });

    expect(response.status).toBe(201);
  });
  it('should return status 400 when unit name is not provided.', async () => {
    const user = await User.create({ email: 'user' });
    const company = await Company.create({
      name: 'company',
      assignedTo: user._id,
    });
    const response = await request(app).post(`/company/${company._id}/unit`);

    expect(response.status).toBe(400);
  });

  it('should return status 404 when it doesnt find the company id.', async () => {
    const response = await request(app).post(
      `/company/5fb3da66a4862c56328b0f96/unit`,
    );

    expect(response.status).toBe(404);
  });
});
