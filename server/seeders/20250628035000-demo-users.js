'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: '$2a$10$K7L1OLZ4OLK7OLZ4OLK7OeHR8gy8Df.Lx.X8a2.2a2.2a2.2a2.2', // hashed 'password123'
        provider: 'local',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: '$2a$10$K7L1OLZ4OLK7OLZ4OLK7OeHR8gy8Df.Lx.X8a2.2a2.2a2.2a2.2', // hashed 'password123'
        provider: 'local',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
