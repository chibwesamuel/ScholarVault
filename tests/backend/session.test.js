describe('Session Management', () => {
    let token;
  
    beforeAll(async () => {
      const res = await request(app)
        .post('/api/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });
      token = res.body.token;
    });
  
    it('should create a session on login', async () => {
      const res = await request(app)
        .get('/api/session')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('sessionId');
    });
  
    it('should destroy a session on logout', async () => {
      const res = await request(app)
        .post('/api/logout')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
    });
  });
  