'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    state: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    district: {
        type: Sequelize.STRING
    },
    street: {
        type: Sequelize.STRING
    },
    number: {
        type: Sequelize.STRING
    },
    complement: {
        type: Sequelize.STRING
    },
          created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('addresses');
  }
};

