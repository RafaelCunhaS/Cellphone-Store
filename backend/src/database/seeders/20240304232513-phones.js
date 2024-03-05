'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Phones',
      [
        {
          id: uuidv4(),
          name: 'Xiaomi Redmi 9',
          brand: 'Xiaomi',
          model: 'Redmi 9',
          price: 10000,
          color: 'red',
        },
        {
          id: uuidv4(),
          name: 'Iphone 14 Pro',
          brand: 'Iphone',
          model: '14 Pro',
          price: 30100,
          color: 'gold',
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Phones', null, {});
  },
};
