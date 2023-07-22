/** @format */

"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("sensors", {
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
                  value: {
                        allowNull: false,
                        type: Sequelize.FLOAT,
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
                  minLimited: {
                        allowNull: false,
                        type: Sequelize.FLOAT,
                  },
                  maxLimited: {
                        allowNull: false,
                        type: Sequelize.FLOAT,
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
            await queryInterface.dropTable("sensors");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
