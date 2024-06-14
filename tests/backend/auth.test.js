const request = require('supertest');
const app = require('../../index'); // Adjust the path to your app

describe('User Authentication', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register a user with existing username', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login a user with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error');
  });
});