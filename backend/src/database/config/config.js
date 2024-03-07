/* eslint-disable global-require */
require('dotenv').config();

const config = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '1234',
  database: process.env.DB_NAME || 'phone_store_db',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 2345,
  dialect: 'postgres',
  dialectModule: require('pg'),
  ...(process.env.DB_SSL && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
  logging: false,
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
