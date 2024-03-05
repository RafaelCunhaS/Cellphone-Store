const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../database/models');
const errorFunction = require('../utils/errorFunction');
const { CONFLICT, BAD_REQUEST } = require('../utils/statusCode');

const login = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== md5(password)) throw errorFunction(BAD_REQUEST, 'Invalid fields');

  return user.id;
};

const create = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ where: { email } });

  if (user) throw errorFunction(CONFLICT, 'User already registered');

  const encryptedPassword = md5(password);
  const userToCreate = {
    id: uuidv4(),
    email: userData.email,
    password: encryptedPassword,
  };

  User.create(userToCreate);

  return userToCreate.id;
};

const remove = async (id) => User.destroy({ where: { id } });

module.exports = {
  login,
  create,
  remove,
};
