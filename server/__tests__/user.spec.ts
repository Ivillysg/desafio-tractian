import request from 'supertest'
import app from '../src/app'
import database from './utils/database';

database('endpoint-testing')

describe('User Controller', () => {

  it('Should create a new user and return status 200', async (done) => {

    const response = await request(app)
      .post('/signup')
      .send({name:'test'})

    expect(response.status).toBe(200)
    done()
  });

  it('should return status 400 when the user name is not provided', async (done) => {

    const response = await request(app)
      .post('/signup')

    expect(response.status).toBe(400)
    done()
  });

});