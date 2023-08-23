/** @format */
import moment from "moment";
import db from "../models/index";
import adafruitService from "./adafruitService";

const getAllHistory = (idEquipt, type) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idEquipt) {
                        resolve({
                              errCode: 1,
                              message: "Missing id equipt!",
                        });
                  }
                  const data = await db.History.findAll({
                        where: { id_equip: idEquipt, type: type },
                        raw: false,
                  });
                  if (data === null) {
                        resolve({
                              errCode: 2,
                              message: `IdSensor ${idEquipt} does not exist`,
                        });
                  } else {
                        resolve({
                              errCode: 0,
                              message: "Success",
                              data: data,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const saveHistorySensor = (id_equip, id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  console.log("check sensor status");
                  const arr = ["v1", "v2", "v3", "v4"];
                  for (let i = 0; i < 4; i++) {
                        let data = await adafruitService.getDataAdafruit(arr[i], id);
                        await db.History.create({
                              type: arr[i],
                              value: data.last_value,
                              id_equip: id_equip[i],
                              timeOn: "",
                              timeOff: "",
                        });
                  }
                  resolve("success");
            } catch (e) {
                  reject(e);
            }
      });
};

const saveHistoryDevice = (id_equip, id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  const arr = ["b1", "b2"];
                  for (let i = 0; i < 2; i++) {
                        let data = await adafruitService.getDataAdafruit(arr[i]);
                        console.log(data);
                        // máy bơm
                        if (data.last_value === "0" || data.last_value === "2") {
                              await db.History.create({
                                    type: arr[i],
                                    value: data.last_value,
                                    id_equip: id_equip[i],
                                    timeOn: "isOff",
                                    timeOff: data.updated_at,
                              });
                        }
                        if (data.last_value === "1" || data.last_value === "3") {
                              await db.History.create({
                                    type: arr[i],
                                    value: data.last_value,
                                    id_equip: id_equip[i],
                                    timeOn: data.updated_at,
                                    timeOff: "isOn",
                              });
                        }
                  }
                  resolve("success");
            } catch (e) {
                  reject(e);
            }
      });
};

const deleteHistory = (idHistory) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idHistory) {
                        resolve({
                              errCode: 1,
                              message: "Missing id history!",
                        });
                  }
                  let history = await db.History.findOne({
                        where: { id: idHistory },
                        raw: false,
                  });
                  if (history === null) {
                        resolve({
                              errCode: 2,
                              message: "Id history does not exist!",
                        });
                  } else {
                        await history.destroy();
                        resolve({
                              errCode: 0,
                              message: "Id history deleted successfully!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const clearHistoryByType = (type) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (type !== "v1" && type !== "v2" && type !== "v3" && type !== "v4") {
                        resolve({
                              errCode: 3,
                              errCode: "You mean v1 or v2 or v3 or v4 ? Try again.",
                        });
                  } else {
                        await db.History.destroy({
                              where: { type: type },
                        });
                        resolve({
                              errCode: 0,
                              message: `Clear history equipment type ${type}`,
                        });
                  }
            } catch (e) {}
      });
};

module.exports = {
      getAllHistory: getAllHistory,
      saveHistorySensor: saveHistorySensor,
      saveHistoryDevice: saveHistoryDevice,
      deleteHistory: deleteHistory,
      clearHistoryByType: clearHistoryByType,
};
