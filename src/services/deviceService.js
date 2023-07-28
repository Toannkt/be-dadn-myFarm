/** @format */

import db from "../models/index";

const getDevice = (idDevice) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idDevice) {
                        resolve({
                              errCode: 1,
                              message: "Missing idDevice!",
                        });
                  }
                  const device = await db.Device.findOne({
                        where: { id: idDevice },
                        raw: false,
                  });
                  if (device === null) {
                        resolve({
                              errCode: 2,
                              message: `IdDevice ${idDevice} dose not exist!`,
                        });
                  }
                  resolve({
                        errCode: 0,
                        message: "Success",
                        dataDevice: device,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const addDevice = (dataDevice) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!dataDevice) {
                        resolve({
                              errCode: 1,
                              message: "Missing data device",
                        });
                  }
                  await db.Device.create({
                        type: dataDevice.type,
                        name: dataDevice.name,
                        status: dataDevice.status,
                        idLocation: dataDevice.idLocation,
                        autoMode: dataDevice.autoMode,
                        timeOn: dataDevice.timeOn,
                        timeOff: dataDevice.timeOff,
                  });
                  resolve({
                        errCode: 0,
                        message: "Add device successfully!",
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const updateDevice = (newName, idDevice) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idDevice) {
                        resolve({
                              errCode: 1,
                              message: "Missing idDevice",
                        });
                  }
                  if (!newName) {
                        resolve({
                              errCode: 1,
                              message: "Missing newName",
                        });
                  }
                  const res = await db.Device.findOne({
                        where: { id: idDevice },
                        raw: false,
                  });
                  if (res === null) {
                        resolve({
                              errCode: 1,
                              message: `IdDevice ${idDevice} does not exist!`,
                        });
                  }
                  const result = await db.Device.findOne({
                        where: { name: newName, id: idDevice },
                  });
                  if (result === null) {
                        res.name = newName;
                        await res.save();
                        resolve({
                              errCode: 0,
                              message: `Device ${idDevice} updated successfully!`,
                        });
                  } else {
                        resolve({
                              errCode: 4,
                              message: "Please update new name because it already exist!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const deleteDevice = (idDevice) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idDevice) {
                        resolve({
                              errCode: 1,
                              message: "Missing idDevice",
                        });
                  }
                  const device = await db.Device.findOne({
                        where: { id: idDevice },
                        raw: false,
                  });
                  if (device === null) {
                        resolve({
                              errCode: 2,
                              message: `IdDevice ${idDevice} does not exist!`,
                        });
                  }
                  await device.destroy();
                  resolve({
                        errCode: 0,
                        message: `Device ${idDevice} deleted successfully!`,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const setStatusDevice = (idDevice, status) => {
      return new Promise(async (resolve, reject) => {
            try {
                  try {
                        if (!idDevice) {
                              resolve({
                                    errCode: 1,
                                    message: "Missing id device!",
                              });
                        }
                        if (!status) {
                              resolve({
                                    errCode: 1,
                                    message: "Missing status!",
                              });
                        }
                        if (status !== "On" && status !== "Off") {
                              resolve({
                                    errCode: 3,
                                    message: `Wrong status ${status}, you mean status 'On' or 'Off', right?`,
                              });
                        }
                        const device = await db.Device.findOne({
                              where: { id: idDevice },
                              raw: false,
                        });
                        if (device === null) {
                              resolve({
                                    errCode: 2,
                                    message: `Device ${idDevice} does not exist!`,
                              });
                        } else {
                              device.status = status;
                              device.autoMode = status;
                              await device.save();
                              resolve({
                                    errCode: 0,
                                    time: "asdads",
                                    message: `Success change status device id ${idDevice}`,
                              });
                        }
                  } catch (e) {
                        reject(e);
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllDevice = (keyDevice) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!keyDevice) {
                        resolve({
                              errCode: 1,
                              message: "Missing keyDevice",
                        });
                  }
                  if (keyDevice !== "allDevice") {
                        resolve({
                              errCode: 2,
                              message: `Key device '${key}' does not exist`,
                        });
                  } else {
                        const allDevice = await db.Device.findAll();
                        resolve({
                              errCode: 0,
                              message: "Success",
                              allDevice: allDevice,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllHistoryDeviceById = (idDevice) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idDevice) {
                        resolve({
                              errCode: 1,
                              message: "Missing id device!",
                        });
                  }
                  const devices = await db.Device.findAll({
                        where: { id: idDevice },
                        raw: false,
                  });
                  if (devices === null) {
                        resolve({
                              errCode: 2,
                              message: `IdSensor ${idDevice} does not exist`,
                        });
                  } else {
                        resolve({
                              errCode: 0,
                              message: "Success",
                              dataDevices: devices,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      getDevice: getDevice,
      addDevice: addDevice,
      updateDevice: updateDevice,
      deleteDevice: deleteDevice,
      setStatusDevice: setStatusDevice,
      getAllDevice: getAllDevice,
      getAllHistoryDeviceById: getAllHistoryDeviceById,
};
