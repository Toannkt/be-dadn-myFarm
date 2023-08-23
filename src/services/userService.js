/** @format */

import bcrypt from "bcryptjs";
import db from "../models/index";
import historyService from "./historyService";
import emailService from "./emailService";
const salt = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let userData = {};
                  let isExist = await checkUserEmail(email);
                  if (isExist) {
                        let user = await db.User.findOne({
                              raw: true,
                              attributes: ["id", "roleId", "email", "password", "firstName", "lastName"],
                              where: { email: email },
                        });
                        if (user) {
                              let check = await bcrypt.compareSync(password, user.password);
                              if (check) {
                                    // const token = createJSONToken
                                    userData.errCode = 0;
                                    userData.errMessage = "Ok!";
                                    delete user.password;
                                    userData.user = user;
                              } else {
                                    userData.errCode = 3;
                                    userData.errMessage = "Wrong Password!";
                              }
                        } else {
                              userData.errCode = 2;
                              userData.errMessage = `User's not found!`;
                        }
                        resolve(userData);
                  } else {
                        userData.errCode = 1;
                        userData.errMessage = `Your's Email isn't exist in your system. Plz try other Email!`;
                        resolve(userData);
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const getAllUsers = (userId) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let users = "";
                  if (userId === "All") {
                        users = await db.User.findAll({
                              attributes: {
                                    exclude: ["password"],
                              },
                        });
                  } else {
                        users = await db.User.findOne({
                              attributes: {
                                    exclude: ["password"],
                              },
                              where: { id: userId },
                        });
                  }
                  resolve(users);
            } catch (e) {
                  reject(e);
            }
      });
};

const checkUserEmail = (email) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let user = await db.User.findOne({
                        where: { email: email },
                  });
                  if (user) resolve(true);
                  else resolve(false);
            } catch (e) {
                  reject(e);
            }
      });
};

const hashUserPassword = (password) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let hashPassword = await bcrypt.hashSync(password, salt);
                  resolve(hashPassword);
            } catch (e) {
                  reject(e);
            }
      });
};

const createNewUser = async (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let check = await checkUserEmail(data.email);
                  if (check) {
                        resolve({
                              errCode: 1,
                              errMessage: "Email is already exist!",
                        });
                  } else {
                        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                        await db.User.create({
                              email: data.email,
                              password: hashPasswordFromBcrypt,
                              firstName: data.firstName,
                              lastName: data.lastName,
                              address: data.address,
                              phoneNumber: data.phoneNumber,
                              roleId: "CUSTOMER",
                              enabled: "false",
                              description: data.description,
                        });
                        resolve({
                              errCode: 0,
                              errMessage: "OK",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const deleteUser = (id) => {
      return new Promise(async (resolve, reject) => {
            try {
                  let user = await db.User.findOne({
                        where: { id: id },
                  });
                  if (!user) {
                        resolve({
                              errCode: 2,
                              message: "User not found!",
                        });
                  }
                  await db.User.destroy({
                        where: { id: id },
                  });
                  resolve({
                        errCode: 0,
                        message: `User ${id} deleted successfully!`,
                  });
            } catch (e) {
                  reject(e);
            }
      });
};

const updateUserData = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!data.id) {
                        resolve({
                              errCode: 2,
                              errMessage: "Missing id!",
                        });
                  }
                  let user = await db.User.findOne({
                        where: { id: data.id },
                        raw: false,
                  });
                  if (user) {
                        user.firstName = data.firstName;
                        user.lastName = data.lastName;
                        user.address = data.address;
                        user.phoneNumber = data.phoneNumber;
                        await user.save();
                        resolve({
                              errCode: 0,
                              message: "User updated!",
                        });
                  } else {
                        resolve({
                              errCode: 1,
                              errMessage: "User not found!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const enabledUser = (id, status) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!id) {
                        resolve({
                              errCode: 1,
                              message: "Missing id user",
                        });
                  }
                  const user = await db.User.findOne({
                        where: { id: id },
                        raw: false,
                  });
                  if (user === null) {
                        resolve({
                              errCode: 2,
                              message: "User does not exist",
                        });
                  } else {
                        user.enabled = status;
                        await user.save();
                        resolve({
                              errCode: 0,
                              message: "Success",
                        });
                        if (status === "true") {
                              const a = setInterval(async () => {
                                    await historyService.saveHistorySensor(["19", "21", "22", "23"], id);
                                    const user = await getAllUsers(id);
                                    if (user.enabled === "false") {
                                          clearInterval(a);
                                    }
                              }, 30000);
                              const b = setInterval(async () => {
                                    await historyService.saveHistoryDevice(["16", "17"], id);
                                    const user = await getAllUsers(id);
                                    if (user.enabled === "false") {
                                          clearInterval(b);
                                    }
                              }, 2000);
                        }
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const changePassword = (data) => {
      return new Promise(async (resolve, reject) => {
            try {
                  console.log(data);
                  if (!data.id) {
                        resolve({
                              errCode: 2,
                              errMessage: "Missing parameters!",
                        });
                  }
                  let user = await db.User.findOne({
                        where: { id: data.id },
                        raw: false,
                  });
                  if (!user) {
                        resolve({
                              errCode: 2,
                              errMessage: "Id does not exist!",
                        });
                  }
                  let { password, newPassword, confirmPassword } = data;
                  let checkPw = await bcrypt.compareSync(password, user.password);
                  let checkNpw = await bcrypt.compareSync(newPassword, user.password);
                  if (checkPw === false) {
                        resolve({
                              errCode: 3,
                              message: "Wrong password, please try again!",
                        });
                  } else if (checkNpw) {
                        resolve({
                              errCode: 4,
                              message: "New password must be the old password, please try again!",
                        });
                  } else if (newPassword !== confirmPassword) {
                        resolve({
                              errCode: 5,
                              message: "Confirm password failed! Please try again",
                        });
                  } else {
                        if (user) {
                              console.log(data);
                              user.password = await hashUserPassword(newPassword);
                              await user.save();
                        }
                        resolve({
                              errCode: 0,
                              message: "User update new password successfully!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const forgotPassword = (email) => {
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
                        const resetPassword = "123456";
                        const hashPw = await hashUserPassword(resetPassword);
                        user.password = hashPw;
                        await user.save();
                        await emailService.sendEmailForgotPassword({
                              reciverEmail: user.email,
                              firstName: user.firstName,
                              resetPassword: resetPassword,
                              // time: data.timeString,
                              // redirecLink: buildUrlEmail(data.doctorId, token),
                        });
                        resolve({
                              errCode: 0,
                              message: "Please check your email to received new password!",
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

const contactUsByEmail = (email, phoneNumber, firstName, desc, title) => {
      return new Promise(async (resolve, reject) => {
            try {
                  if (!email) {
                        resolve({
                              errCode: 1,
                              message: "Missing email!",
                        });
                  }
                  const user = await db.User.findOne({
                        where: { email: email },
                        raw: false,
                  });
                  if (user === null) {
                        resolve({
                              errCode: 2,
                              message: "Email does not exist!",
                        });
                  } else {
                        await emailService.sendEmailContact({
                              email: email,
                              title: title,
                              phoneNumber: phoneNumber,
                              desc: desc,
                              firstName: firstName,
                        });
                  }
            } catch (e) {
                  reject(e);
            }
      });
};

module.exports = {
      handleUserLogin: handleUserLogin,
      getAllUsers: getAllUsers,
      checkUserEmail: checkUserEmail,
      deleteUser: deleteUser,
      updateUserData: updateUserData,
      createNewUser: createNewUser,
      changePassword: changePassword,
      forgotPassword: forgotPassword,
      contactUsByEmail: contactUsByEmail,
      enabledUser: enabledUser,
};
