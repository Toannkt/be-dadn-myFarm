/** @format */

"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("histories", {
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
                        allowNull: true,
                        type: Sequelize.STRING,
                  },
                  id_equip: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
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
            await queryInterface.dropTable("histories");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
