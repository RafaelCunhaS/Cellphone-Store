/* eslint-disable strict */

'use strict';

const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          email: 'lewishamilton@gmail.com',
          password: md5('123456'),
        },
        {
          id: uuidv4(),
          email: 'MichaelSchumacher@gmail.com',
          password: md5('123456'),
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
