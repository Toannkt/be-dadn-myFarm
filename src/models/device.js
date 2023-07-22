/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class Device extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here
                  Device.belongsTo(models.Location, { foreignKey: "idLocation" });
            }
      }
      Device.init(
            {
                  type: DataTypes.STRING,
                  name: DataTypes.STRING,
                  status: DataTypes.STRING,
                  idLocation: DataTypes.INTEGER,
                  autoMode: DataTypes.STRING,
                  timeOn: DataTypes.STRING,
                  timeOff: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "Device",
            },
      );
      return Device;
};
