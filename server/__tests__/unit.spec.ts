import request from 'supertest';
import { app } from '../src/app';
import User from '../src/app/models/user';
import database from './utils/database';
import Unit from '../src/app/models/unit';
import Company from '../src/app/models/companys';

import faker from 'faker';
database('endpoints-tests');

describe('Unit Controller', () => {
  describe('Create Router', () => {
    it('Should return status 201.', async () => {
      const user = await User.create({
        email: faker.internet.email(),
      });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });
      const response = await request(app)
        .post(`/unit/${company._id}`)
        .send({ name: faker.company.companySuffix() });

      expect(response.status).toBe(201);
    });
    it('should return status 400 when unit name is not provided.', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });
      const response = await request(app).post(`/unit/${company._id}`);

      expect(response.status).toBe(400);
    });

    it('should return status 404 when it doesnt find the company id.', async () => {
      const response = await request(app).post(
        `/company/5fb3da66a4862c56328b0f96/unit`,
      );

      expect(response.status).toBe(404);
    });
  });

  describe('PUT ROUTER', () => {
    it('Should return status 200.', async () => {
      const user = await User.create({
        email: faker.internet.email(),
      });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });
      const unit = await Unit.create({
        name: faker.company.companyName(),
        company: company.id,
        assignedTo: user._id,
      });
      const response = await request(app)
        .put(`/unit/${unit._id}`)
        .send({ name: faker.company.companySuffix() });

      expect(response.status).toBe(200);
    });
    it('should return status 400 when the name is not provided.', async () => {
      const user = await User.create({
        email: faker.internet.email(),
      });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });
      const unit = await Unit.create({
        name: faker.company.companyName(),
        company: company.id,
        assignedTo: user._id,
      });
      const response = await request(app).put(`/unit/${unit._id}`);

      expect(response.status).toBe(400);
    });
    it('should return status 404 ', async () => {
      const response = await request(app)
        .put(`/unit/5fb3da66a4862c56328b0f96`)
        .send({ name: faker.company.companySuffix() });

      expect(response.status).toBe(404);
    });
  });
  describe('Delete Router', () => {
    it('should return status 200', async () => {
      const user = await User.create({
        email: faker.internet.email(),
      });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });
      const unit = await Unit.create({
        name: faker.company.companyName(),
        company: company.id,
        assignedTo: user._id,
      });

      const response = await request(app).delete(`/unit/${unit.id}`);

      expect(response.status).toBe(200);
    });
    it('should return status 404', async () => {
      const response = await request(app).delete(
        `/unit/5fb3da66a4862c56328b0f96`,
      );

      expect(response.status).toBe(404);
    });
  });
});
