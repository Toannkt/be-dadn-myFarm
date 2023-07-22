/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Sensor extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  Sensor.belongsTo(models.Location, { foreignKey: "idLocation" });
            }
      }
      Sensor.init(
            {
                  type: DataTypes.STRING,
                  value: DataTypes.FLOAT,
                  name: DataTypes.STRING,
                  status: DataTypes.STRING,
                  idLocation: DataTypes.INTEGER,
                  minLimited: DataTypes.FLOAT,
                  maxLimited: DataTypes.FLOAT,
                  timeOn: DataTypes.STRING,
                  timeOff: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Sensor",
            },
      );
      return Sensor;
};
