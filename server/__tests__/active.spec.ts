import request from 'supertest';
import { app } from '../src/app';
import database from './utils/database';
import User from '../src/app/models/user';
import Company from '../src/app/models/companys';
import Active from '../src/app/models/active';
import Unit from '../src/app/models/unit';
import faker from 'faker';

database('endpoints-tests');

describe('Active Controller', () => {
  describe('Create Router', () => {
    it('Should return status 201.', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });

      const unit = await Unit.create({
        name: faker.company.companySuffix(),
        company: company._id,
        assignedTo: user._id,
      });

      const response = await request(app)
        .post(`/active/${unit._id}`)
        .send({
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(3),
          model: 'CM-133',
          image: faker.image.imageUrl(),
          status: 'Disponível',
          healthScore: 80,
        });

      expect(response.status).toBe(201);
    });
    it('Should return status 201.', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });

      const unit = await Unit.create({
        name: faker.company.companySuffix(),
        company: company._id,
        assignedTo: user._id,
      });

      const response = await request(app).post(`/active/${unit._id}`);

      expect(response.status).toBe(400);
    });
  });
  describe('Put Router', () => {
    it('Should return status 200.', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });

      const unit = await Unit.create({
        name: faker.company.companySuffix(),
        company: company._id,
        assignedTo: user._id,
      });
      const active = await Active.create({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(3),
        model: 'CM-133',
        unit: unit.id,
        company: company.id,
        assignedTo: user.id,
        image: faker.image.imageUrl(),
        status: 'Disponível',
        healthScore: 80,
      });

      const response = await request(app)
        .put(`/active/${active._id}`)
        .send({
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(3),
          model: 'CM-133',
          image: faker.image.imageUrl(),
          status: 'Disponível',
          healthScore: 80,
        });

      expect(response.status).toBe(200);
    });
    it('Should return status 400 when nothing is provided.', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });

      const unit = await Unit.create({
        name: faker.company.companySuffix(),
        company: company._id,
        assignedTo: user._id,
      });
      const active = await Active.create({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(3),
        model: 'CM-133',
        unit: unit.id,
        company: company.id,
        assignedTo: user.id,
        image: faker.image.imageUrl(),
        status: 'Disponível',
        healthScore: 80,
      });

      const response = await request(app).put(`/active/${active._id}`);

      expect(response.status).toBe(400);
    });
    it('Should return status 404', async () => {
      const response = await request(app)
        .put(`/active/5fb45b520269096d14a2a6bc`)
        .send({
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(3),
          model: 'CM-133',
          image: faker.image.imageUrl(),
          status: 'Disponível',
          healthScore: 80,
        });

      expect(response.status).toBe(404);
    });
  });
  describe('Delete Router', () => {
    it('Should return status 400 when nothing is provided.', async () => {
      const user = await User.create({ email: faker.internet.email() });
      const company = await Company.create({
        name: faker.company.companyName(),
        assignedTo: user._id,
      });

      const unit = await Unit.create({
        name: faker.company.companySuffix(),
        company: company._id,
        assignedTo: user._id,
      });
      const active = await Active.create({
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(3),
        model: 'CM-133',
        unit: unit.id,
        company: company.id,
        assignedTo: user.id,
        image: faker.image.imageUrl(),
        status: 'Disponível',
        healthScore: 80,
      });

      const response = await request(app).delete(`/active/${active._id}`);

      expect(response.status).toBe(200);
    });
    it('Should return status 404', async () => {
      const response = await request(app).delete(
        `/active/5fb435065161554beb126931`,
      );

      expect(response.status).toBe(404);
    });
  });
});
