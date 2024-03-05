const cellphoneService = require('../services/cellphoneService');
const { CREATED, OK_STATUS, NO_CONTENT } = require('../utils/statusCode');

const getAll = async (_req, res) => {
  const cellphones = await cellphoneService.getAll();

  res.status(OK_STATUS).json(cellphones);
};

const create = async (req, res) => {
  await cellphoneService.create(req.body);

  return res.status(CREATED).end();
};

const update = async (req, res) => {
  const { id } = req.params;

  await cellphoneService.update(id, req.body);

  return res.status(NO_CONTENT).end();
};

const remove = async (req, res) => {
  const { id } = req.params;

  await cellphoneService.remove(id);

  return res.status(NO_CONTENT).end();
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};