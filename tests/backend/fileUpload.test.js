const path = require('path');

describe('File Upload', () => {
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

  it('should upload a file', async () => {
    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', path.resolve(__dirname, 'testfile.txt'));
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('fileUrl');
  });

  it('should handle invalid file type', async () => {
    const res = await request(app)
      .post('/api/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', path.resolve(__dirname, 'testfile.invalid'));
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
