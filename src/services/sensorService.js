/** @format */

import db from "../models/index";
import emailService from "./emailService";

const getSensor = (idSensor) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idSensor) {
                        resolve({
                              errCode: 1,
                              message: "Missing id sensor!",
                        });
                  }
                  let sensor = "";
                  if (idSensor === "All") {
                        sensor = await db.Sensor.findAll();
                  } else {
                        sensor = await db.Sensor.findOne({
                              where: { id: idSensor },
                              raw: false,
                        });
                  }
                  if (sensor === null) {
                        resolve({
                              errCode: 2,
                              message: `Sensor ${idSensor} does not exist!`,
                        });
                  } else {
                        resolve({
                              errCode: 0,
                              message: "Success",
                              dataSensor: sensor,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const addSensor = (dataSensor) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!dataSensor) {
                        resolve({
                              errCode: 1,
                              message: "Missing data sensor",
                        });
                  }
                  await db.Sensor.create({
                        type: dataSensor.type,
                        value: "0",
                        name: dataSensor.name,
                        status: "On",
                        idLocation: dataSensor.idLocation,
                        minLimited: dataSensor.minLimited,
                        maxLimited: dataSensor.maxLimited,
                  });

                  resolve({
                        errCode: 0,
                        message: "Success",
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const updateSensor = (minLimited, maxLimited, idSensor) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idSensor) {
                        resolve({
                              errCode: 1,
                              message: "Missing idSensor!",
                        });
                  }
                  const sensor = await db.Sensor.findOne({
                        where: { id: idSensor },
                        raw: false,
                  });
                  if (sensor === null) {
                        resolve({
                              errCode: 2,
                              message: `IdSensor ${idSensor} does not exist!`,
                        });
                  } else {
                        sensor.minLimited = minLimited;
                        sensor.maxLimited = maxLimited;
                        await sensor.save();
                        resolve({
                              errCode: 0,
                              message: `Sensor ${idSensor} updated successfully!`,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const deleteSensor = (idSensor) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idSensor) {
                        resolve({
                              errCode: 1,
                              message: "Missing id sensor!",
                        });
                  }
                  const sensor = await db.Sensor.findOne({
                        where: { id: idSensor },
                        raw: false,
                  });
                  if (sensor === null) {
                        resolve({
                              errCode: 2,
                              message: `ensor ${idSensor} does not exist!`,
                        });
                  } else {
                        await sensor.destroy();
                        resolve({
                              errCode: 0,
                              message: "Success",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const setStatusSensor = (idSensor, status) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idSensor) {
                        resolve({
                              errCode: 1,
                              message: "Missing id sensor!",
                        });
                  }
                  if (!status) {
                        resolve({
                              errCode: 1,
                              message: "Missing status!",
                        });
                  }
                  const sensor = await db.Sensor.findOne({
                        where: { id: idSensor },
                        raw: false,
                  });
                  if (sensor === null) {
                        resolve({
                              errCode: 2,
                              message: `Device ${idSensor} does not exist!`,
                        });
                  } else {
                        sensor.status = status;
                        await sensor.save();
                        resolve({
                              errCode: 0,
                              message: `Success change status device id ${idSensor}`,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const limitThresholdWarning = (email, nameLocation, descCondition) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let user = await db.User.findOne({
                        where: { email: email },
                        raw: false,
                  });
                  if (!user) {
                        resolve({
                              errCode: 2,
                              message: "Email does not exist! Please try again.",
                        });
                  } else {
                        await emailService.sendEmailGoBeyondLimit({
                              reciverEmail: user.email,
                              firstName: user.firstName,
                              nameLocation: nameLocation,
                              descCondition: descCondition,
                        });
                        resolve({
                              errCode: 0,
                              message: "Please check your email to received notification!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      addSensor: addSensor,
      getSensor: getSensor,
      updateSensor: updateSensor,
      deleteSensor: deleteSensor,
      setStatusSensor: setStatusSensor,
      limitThresholdWarning: limitThresholdWarning,
};
