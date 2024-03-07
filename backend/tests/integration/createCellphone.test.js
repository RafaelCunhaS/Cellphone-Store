const app = require('../../src/api');
const request = require('supertest');

describe('Create Cellphone', () => {
  let authToken;

  beforeAll(async () => {
    const { body } = await request(app).post('/user/login').send({ email: 'johndoe@gmail.com', password: '123456' });
    authToken = body.token;
  });

  it('should create a cellphone with first structure', async () => {
    const cellphoneData = {
      name: 'Samsung Galaxy S21',
      brand: 'Samsung',
      model: 'S21',
      price: 9999,
      color: 'Black',
    };

    await request(app).post('/cellphone').send(cellphoneData).set({ Authorization: authToken }).expect(201);
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

    await request(app).post('/cellphone').send(cellphoneData).set({ Authorization: authToken }).expect(201);
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

    await request(app).post('/cellphone').send(cellphoneData).set({ Authorization: authToken }).expect(201);
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

    const { statusCode, body } = await request(app)
      .post('/cellphone')
      .send(cellphoneData)
      .set({ Authorization: authToken });

    expect(statusCode).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid request structure');
  });
});
