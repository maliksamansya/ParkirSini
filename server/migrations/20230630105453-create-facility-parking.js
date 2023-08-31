'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FacilityParkings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facilityId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Facilities',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      parkingSpaceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ParkingSpaces',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FacilityParkings');
  }
};