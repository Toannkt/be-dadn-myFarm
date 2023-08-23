/** @format */
import db from "../models/index";

const getLocation = (idLocation) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idLocation) {
                        resolve({
                              errCode: 1,
                              message: "Missing idLocation!",
                        });
                  }
                  let location = "";
                  if (idLocation === "All") {
                        location = await db.Location.findAll({});
                  } else {
                        location = await db.Location.findOne({
                              where: { id: idLocation },
                              raw: false,
                        });
                  }
                  if (location === null) {
                        resolve({
                              errCode: 2,
                              message: `IdLocation ${idLocation} does not exist!`,
                        });
                  } else {
                        resolve({
                              errCode: 0,
                              message: "Success",
                              dataLocation: location,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const addLocation = (name, idUser) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!name) {
                        resolve({
                              errCode: 1,
                              message: "Missing name location!",
                        });
                  }
                  if (!idUser) {
                        resolve({
                              errCode: 1,
                              message: "Missing id user!",
                        });
                  }
                  const user = await db.User.findOne({
                        where: { id: idUser },
                        raw: false,
                  });
                  if (user === null) {
                        resolve({
                              errCode: 2,
                              message: `User ${idUser} does not exist!`,
                        });
                  }
                  const result = await db.Location.findOne({
                        where: { name: name, id_User: idUser },
                  });
                  if (result === null) {
                        if (name && idUser) {
                              await db.Location.create({
                                    name: name,
                                    id_User: idUser,
                              });
                              resolve({
                                    errCode: 0,
                                    message: "Add location successfully!",
                              });
                        }
                  } else {
                        resolve({
                              errCode: 4,
                              message: "Please give a name different name had already!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const updateLocation = (newName, idLocation) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!id) {
                        resolve({
                              errCode: 1,
                              message: "Missing idLocation",
                        });
                  }
                  if (!newName) {
                        resolve({
                              errCode: 1,
                              message: "Missing newName",
                        });
                  }
                  const res = await db.Location.findOne({
                        where: { id: idLocation },
                        raw: false,
                  });
                  if (res === null) {
                        resolve({
                              errCode: 1,
                              message: `IdLocation ${idLocation} does not exist!`,
                        });
                  }
                  const result = await db.Location.findOne({
                        where: { name: newName, id: idLocation },
                  });
                  if (result === null) {
                        res.name = newName;
                        await res.save();
                        resolve({
                              errCode: 0,
                              message: "Update location successfully!",
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

const deleteLocation = (idLocation) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!idLocation) {
                        resolve({
                              errCode: 1,
                              message: "Missing idLocation!",
                        });
                  }
                  const location = await db.Location.findOne({
                        where: { id: idLocation },
                        raw: false,
                  });
                  if (location === null) {
                        resolve({
                              errCode: 2,
                              message: `IdLocation ${idLocation} does not exist!`,
                        });
                  } else {
                        const pumps = await db.Device.findAll({
                              where: { idLocation: idLocation },
                              raw: false,
                        });
                        let lengthPumps = pumps.length;
                        const sensors = await db.Sensor.findAll({
                              where: { idLocation: idLocation },
                              raw: false,
                        });
                        let lengthSensors = sensors.length;
                        while (lengthSensors > 0 || lengthPumps > 0) {
                              if (lengthSensors > 0) {
                                    await sensors[lengthSensors - 1].destroy();
                                    lengthSensors--;
                              }
                              if (lengthPumps > 0) {
                                    await pumps[lengthPumps - 1].destroy();
                                    lengthPumps--;
                              }
                        }
                        await location.destroy();
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

module.exports = {
      addLocation: addLocation,
      updateLocation: updateLocation,
      getLocation: getLocation,
      deleteLocation: deleteLocation,
};
