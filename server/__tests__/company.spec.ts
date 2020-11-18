import request from 'supertest';
import { app } from '../src/app';
import database from './utils/database';
import User from '../src/app/models/user';
import Companys from '../src/app/models/companys';

import faker from 'faker';

database('endpoints-tests');

describe('Company Controller', () => {
  describe('Create Router', () => {
    it('Should return status 201', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const response = await request(app)
        .post(`/company/${user.id}`)
        .send({ name: faker.company.companyName(), assignedTo: user._id });

      expect(response.status).toBe(201);
    });

    it('should return status 400 when the name is not provided', async () => {
      const user = await User.create({ email: faker.internet.email() });

      const response = await request(app).post(`/company/${user.id}`);

      expect(response.status).toBe(400);
    });

    it('should return status 404 when it doesnt find the user id.', async () => {
      const response = await request(app).post(
        `/company/5fb3da5aa4862c56328b0f95`,
      );

      expect(response.status).toBe(404);
    });
  });
  describe('Put Router', () => {
    it('Should return status 200', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Companys.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });
      const response = await request(app)
        .put(`/company/${company.id}`)
        .send({ name: faker.company.companyName() });

      expect(response.status).toBe(200);
    });
    it('should return status 400 when the name is not provided', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Companys.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });
      const response = await request(app).put(`/company/${company.id}`);

      expect(response.status).toBe(400);
    });
    it('should return status 404', async () => {
      const response = await request(app)
        .put(`/company/5fb435065161554beb126931`)
        .send({ name: faker.company.companyName() });

      expect(response.status).toBe(404);
    });
  });

  describe('Delete Router', () => {
    it('Should return status 200', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Companys.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });
      const response = await request(app).delete(`/company/${company.id}`);

      expect(response.status).toBe(200);
    });

    it('should return status 404', async () => {
      const response = await request(app).delete(
        `/company/5fb435065161554beb126931`,
      );

      expect(response.status).toBe(404);
    });
  });
});
