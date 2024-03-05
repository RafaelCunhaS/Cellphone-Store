'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          email: 'lewishamilton@gmail.com',
          password: '123456',
        },
        {
          id: uuidv4(),
          email: 'MichaelSchumacher@gmail.com',
          password: '123456',
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
