const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { Cellphone } = require('../database/models');
const errorFunction = require('../utils/errorFunction');
const { NOT_FOUND } = require('../utils/statusCode');

const getAll = async (query, pagination) => {
  const { category, search, sort } = query;
  const { page, size } = pagination;
  const filters = {};

  if (category && search) {
    filters[category] = { [Op.iLike]: `%${search}%` };
  }

  const cellphones = await Cellphone.findAndCountAll({
    limit: size,
    offset: page * size,
    where: filters,
    order: sort ? [['price', sort]] : [],
  });

  return cellphones;
};

const getById = async (id) => {
  const cellphone = await Cellphone.findByPk(id);

  if (!cellphone) throw errorFunction(NOT_FOUND, 'Cellphone does not exist');

  return cellphone;
};

const create = async (cellphoneData) => {
  if (Array.isArray(cellphoneData)) {
    // eslint-disable-next-line arrow-body-style
    const cellphonesToCreate = cellphoneData.flatMap((cellphone) => {
      return cellphone.data.map((info) => ({
        id: uuidv4(),
        name: cellphone.name,
        brand: cellphone.brand,
        model: cellphone.model,
        price: info.price,
        color: info.color,
      }));
    });

    Cellphone.bulkCreate(cellphonesToCreate);
  } else if (Object.hasOwn(cellphoneData, 'details')) {
    Cellphone.create({
      id: uuidv4(),
      name: cellphoneData.name,
      brand: cellphoneData.details.brand,
      model: cellphoneData.details.model,
      price: cellphoneData.price,
      color: cellphoneData.details.color,
    });
  } else {
    Cellphone.create({ id: uuidv4(), ...cellphoneData });
  }
};

const update = async (id, cellphoneData) => {
  const phone = await Cellphone.findByPk(id);

  if (!phone) throw errorFunction(NOT_FOUND, 'Cellphone does not exist');

  await Cellphone.update(cellphoneData, { where: { id } });
};

const remove = async (id) => Cellphone.destroy({ where: { id } });

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
