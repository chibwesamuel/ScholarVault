describe('Inventory Management', () => {
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
  
    it('should create a new inventory item', async () => {
      const res = await request(app)
        .post('/api/inventory')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Projector',
          quantity: 5,
          condition: 'New'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
    });
  
    it('should get all inventory items', async () => {
      const res = await request(app)
        .get('/api/inventory')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  
    it('should update an inventory item', async () => {
      const item = await request(app)
        .post('/api/inventory')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Laptop',
          quantity: 10,
          condition: 'Used'
        });
  
      const res = await request(app)
        .put(`/api/inventory/${item.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          quantity: 8
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body.quantity).toEqual(8);
    });
  
    it('should delete an inventory item', async () => {
      const item = await request(app)
        .post('/api/inventory')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Tablet',
          quantity: 15,
          condition: 'New'
        });
  
      const res = await request(app)
        .delete(`/api/inventory/${item.body._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(204);
    });
  });
  