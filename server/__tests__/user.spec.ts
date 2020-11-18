import request from 'supertest';
import { app } from '../src/app';
import database from './utils/database';
import User from '../src/app/models/user';
import faker from 'faker';
database('endpoints-tests');

describe('User Controller', () => {
  describe('Create Router', () => {
    it('should return status 201', async () => {
      const response = await request(app).post('/user').send({
        email: faker.internet.email(),
      });

      expect(response.status).toBe(201);
    });

    it('should return status 400 when the user email is not provided', async () => {
      const response = await request(app).post('/user');
      expect(response.status).toBe(400);
    });
  });

  describe('Put Router', () => {
    it('should return status 200', async () => {
      const user = await User.create({ email: faker.internet.email() });

      const response = await request(app).put(`/user/${user.id}`).send({
        email: faker.internet.email(),
      });

      expect(response.status).toBe(200);
    });
    it('should return status 400 when the email is not provided', async () => {
      const user = await User.create({ email: faker.internet.email() });

      const response = await request(app).put(`/user/${user.id}`);

      expect(response.status).toBe(400);
    });
    it('should return status 404', async () => {
      const response = await request(app)
        .put(`/user/5fb45ccca9d6876fca60793c`)
        .send({
          email: faker.internet.email(),
        });

      expect(response.status).toBe(404);
    });
  });

  describe('Delete Router', () => {
    it('should return status 200', async () => {
      const user = await User.create({ email: faker.internet.email() });

      const response = await request(app).delete(`/user/${user.id}`);

      expect(response.status).toBe(200);
    });

    it('should return status 404', async () => {
      const response = await request(app).delete(
        `/user/5fb435065161554beb126931`,
      );

      expect(response.status).toBe(404);
    });
  });
});
