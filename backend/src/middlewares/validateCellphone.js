const Joi = require('joi');
const errorFunction = require('../utils/errorFunction');

const schema1 = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  price: Joi.number().required(),
  color: Joi.string().required(),
});

const schema2 = Joi.object({
  name: Joi.string().required(),
  details: Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    color: Joi.string().required(),
  }),
  price: Joi.number().required(),
});

const schema3 = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    data: Joi.array().items(
      Joi.object({
        price: Joi.number().required(),
        color: Joi.string().required(),
      })
    ),
  })
);

const validationSchemas = [schema1, schema2, schema3];

module.exports = (req, _res, next) => {
  const error = validationSchemas.every((schema) => schema.validate(req.body).error);

  if (error) return next(errorFunction(400, 'Invalid request structure'));

  return next();
};
