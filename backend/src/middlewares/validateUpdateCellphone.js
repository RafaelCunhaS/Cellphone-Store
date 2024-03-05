const Joi = require('joi');
const errorFunction = require('../utils/errorFunction');

const schema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required(),
  color: Joi.string().required(),
});

module.exports = (req, _res, next) => {
  const { error } = schema.validate(req.body);

  if (error) return next(errorFunction(400, error.message));

  return next();
};
