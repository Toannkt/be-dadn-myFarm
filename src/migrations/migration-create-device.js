/** @format */

"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("devices", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  type: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  name: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  status: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  idLocation: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                  },
                  autoMode: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  timeOn: {
                        allowNull: true,
                        type: Sequelize.STRING,
                  },
                  timeOff: {
                        allowNull: true,
                        type: Sequelize.STRING,
                  },
                  createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                  },
                  updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                  },
            });
      },
      down: async (queryInterface, Sequelize) => {
            await queryInterface.dropTable("devices");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
