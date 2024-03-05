/* eslint-disable strict */

'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Cellphones',
      [
        {
          id: uuidv4(),
          name: 'Xiaomi Redmi 9',
          brand: 'Xiaomi',
          model: 'Redmi 9',
          price: 10000,
          color: 'red',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Iphone 14 Pro',
          brand: 'Iphone',
          model: '14 Pro',
          price: 30100,
          color: 'gold',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { timestamps: false }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Cellphones', null, {});
  },
};
