const app = require('../../src/api');
const request = require('supertest');

describe('Create Cellphone', () => {
  it('should create a cellphone with first structure', async () => {
    const cellphoneData = {
      name: 'Samsung Galaxy S21',
      brand: 'Samsung',
      model: 'S21',
      price: 9999,
      color: 'Black',
    };

    const {
      body: { token },
    } = await request(app).post('/user/login').send({ email: 'johndoe@gmail.com', password: '123456' });

    await request(app).post('/cellphone').send(cellphoneData).set({ Authorization: token }).expect(201);
  });

  it('should create a cellphone with second structure', async () => {
    const cellphoneData = {
      name: 'Samsung Galaxy S21',
      details: {
        brand: 'Samsung',
        model: 'S21',
        color: 'Black',
      },
      price: 9999,
    };

    const {
      body: { token },
    } = await request(app).post('/user/login').send({ email: 'johndoe@gmail.com', password: '123456' });

    await request(app).post('/cellphone').send(cellphoneData).set({ Authorization: token }).expect(201);
  });

  it('should create a cellphone with third structure', async () => {
    const cellphoneData = [
      {
        name: 'Samsung Galaxy S21',
        brand: 'Samsung',
        model: 'S21',
        data: [
          {
            price: 9999,
            color: 'Black',
          },
          {
            price: 9999,
            color: 'Blue',
          },
        ],
      },
    ];

    const {
      body: { token },
    } = await request(app).post('/user/login').send({ email: 'johndoe@gmail.com', password: '123456' });

    await request(app).post('/cellphone').send(cellphoneData).set({ Authorization: token }).expect(201);
  });

  it('should handle invalid body structure', async () => {
    const cellphoneData = [
      {
        name: 'Samsung Galaxy S21',
        brand: 'Samsung',
        model: 'S21',
        data: {
          price: 9999,
          color: 'Black',
        },
      },
    ];

    const {
      body: { token },
    } = await request(app).post('/user/login').send({ email: 'johndoe@gmail.com', password: '123456' });

    const { statusCode, body } = await request(app)
      .post('/cellphone')
      .send(cellphoneData)
      .set({ Authorization: token });

    expect(statusCode).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid request structure');
  });
});
