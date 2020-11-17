import request from 'supertest'
import app from '../src/app'
import User from '../src/app/models/user'
import database from './utils/database'


// Setup a Test Database
database('endpoint-testing')

//tests...
describe('User Controller', () => {

  it('Should create a new user and return status 200', async () => {
    const user = await User.create({
      name: 'Test',
    })

    const response = await request(app)
      .post('/user')
      .send(user)

    expect(response.status).toBe(200)
  });


});