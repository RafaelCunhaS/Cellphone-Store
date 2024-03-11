const { validate } = require('uuid');
const errorFunction = require('../utils/errorFunction');
const statusCode = require('../utils/statusCode');

module.exports = (req, _res, next) => {
  const { id } = req.params;
  if (!validate(id)) return next(errorFunction(statusCode.BAD_REQUEST, 'Invalid id type'));
  return next();
};
