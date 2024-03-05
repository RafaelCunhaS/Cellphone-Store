const userService = require('../services/userService');
const { CREATED, OK_STATUS, NO_CONTENT } = require('../utils/statusCode');
const generateToken = require('../utils/generateToken');

const login = async (req, res) => {
  const id = await userService.login(req.body);

  const token = generateToken(id, req.body.email);

  res.status(OK_STATUS).json({ token });
};

const create = async (req, res) => {
  const id = await userService.create(req.body);

  const { email } = req.body;

  const token = generateToken(id, email);

  return res.status(CREATED).json({ token });
};

const remove = async (req, res) => {
  const { userId } = req.user;

  await userService.remove(userId);

  return res.status(NO_CONTENT).end();
};

module.exports = {
  login,
  create,
  remove,
};
