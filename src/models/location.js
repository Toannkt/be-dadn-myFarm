/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Location extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here
                  // // Markdown.hasMany(models.Doctor_Infor, { foreignKey: "doctorId", as: "priceTypeData" });
                  // Markdown.belongsTo(models.Doctor_Infor, { foreignKey: "doctorId" });
                  // Markdown.belongsTo(models.User, { foreignKey: "doctorId" });
                  Location.belongsTo(models.User, { foreignKey: "id_User" });
                  Location.hasMany(models.Device, { foreignKey: "idLocation" });
                  Location.hasMany(models.Sensor, { foreignKey: "idLocation" });
            }
      }
      Location.init(
            {
                  name: DataTypes.STRING,
                  id_User: DataTypes.INTEGER,
            },
            {
                  sequelize,
                  modelName: "Location",
            },
      );
      return Location;
};
