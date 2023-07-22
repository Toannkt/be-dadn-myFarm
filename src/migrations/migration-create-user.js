/** @format */

"use strict";
module.exports = {
      up: async (queryInterface, Sequelize) => {
            await queryInterface.createTable("users", {
                  id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER,
                  },
                  email: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  password: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  firstName: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  lastName: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  address: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  roleId: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  phoneNumber: {
                        allowNull: false,
                        type: Sequelize.STRING,
                  },
                  description: {
                        allowNull: true,
                        type: Sequelize.TEXT,
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
            await queryInterface.dropTable("users");
      },
};

// npx sequelize-cli db:migrate --to migration-create-user.js
