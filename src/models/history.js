/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
      class History extends Model {
            /**
             * Helper method for defining associations.
             * This method is not a part of Sequelize lifecycle.
             * The `models/index` file will call this method automatically.
             */
            static associate(models) {
                  // define association here
                  History.belongsTo(models.Sensor, { foreignKey: "id_equip" });
                  History.belongsTo(models.Device, { foreignKey: "id_equip" });
            }
      }
      History.init(
            {
                  type: DataTypes.STRING,
                  id_equip: DataTypes.STRING,
                  value: DataTypes.STRING,
                  timeOn: DataTypes.STRING,
                  timeOff: DataTypes.STRING,
            },
            {
                  sequelize,
                  modelName: "History",
            },
      );
      return History;
};
