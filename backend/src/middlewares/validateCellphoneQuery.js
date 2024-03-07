const Joi = require('joi');
const errorFunction = require('../utils/errorFunction');

const schema = Joi.object({
  category: Joi.string().valid('name', 'brand', 'model', 'color'),
  sort: Joi.string().valid('asc', 'desc'),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.query);

  if (error) return next(errorFunction(400, 'Invalid query fields'));

  return next();
};
