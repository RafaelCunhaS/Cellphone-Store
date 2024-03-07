const userService = require('../../src/services/userService');
const request = require('supertest');
const app = require('../../src/api');

jest.mock('../../src/services/userService');

describe('userController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('login', () => {
    it('should respond with a token on successful login', async () => {
      const res = await request(app).post('/user/login').send({ email: 'johndoe@gmail.com', password: '123456' });
      userService.login.mockResolvedValue({ id: 'validId' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should handle invalid credentials', async () => {
      const res = await request(app).post('/user/login').send({ password: '123456' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('"email" is required');
    });
  });

  describe('create', () => {
    it('should respond with a token on successful user creation', async () => {
      const res = await request(app).post('/user').send({ email: 'johndoe@gmail.com', password: '123456' });
      userService.login.mockResolvedValue({ id: 'validId' });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should handle invalid user data', async () => {
      const res = await request(app).post('/user').send({ email: 'johndoe@gmail.com', password: '123' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('"password" length must be at least 6 characters long');
    });
  });
});
