/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class User extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // User.belongsTo(models.Allcodes, {
                  //       foreignKey: "positionId",
                  //       targetKey: "keyMap",
                  //       as: "positionData",
                  // });
                  // User.hasOne(models.Markdown, { foreignKey: "doctorId" });
                  // User.hasOne(models.Doctor_Infor, { foreignKey: "doctorId" });
                  // User.hasMany(models.Schedule, { foreignKey: "doctorId", as: "doctorData" });
                  User.hasOne(models.Location, { foreignKey: "id_User" });
            }
      }
      User.init(
            {
                  email: DataTypes.STRING,
                  password: DataTypes.STRING,
                  firstName: DataTypes.STRING,
                  lastName: DataTypes.STRING,
                  address: DataTypes.STRING,
                  roleId: DataTypes.STRING,
                  phoneNumber: DataTypes.STRING,
                  description: DataTypes.TEXT("long"),
            },
            {
                  sequelize,
                  modelName: "User",
            },
      );
      return User;
};
