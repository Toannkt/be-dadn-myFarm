/** @format */

import userService from "../services/userService";
// import { createJSONToken, parseJwt } from "../utils/auth";
const handleLogin = async (req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      if (!email || !password) {
            return res.status(500).json({
                  errCode: 1,
                  message: "Missing enter email or password",
            });
      }
      let userData = await userService.handleUserLogin(email, password);
      // const token = createJSONToken(userData.user.id);
      return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
            // token: token,
      });
};

let handleGetAllUsers = async (req, res) => {
      let id = req.query.id;
      if (!id) {
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing parameter",
                  users: [],
            });
      }
      let users = await userService.getAllUsers(id);
      return res.status(200).json({
            errCode: 0,
            errMessage: "Ok",
            users: users,
      });
};

const handleCreateNewUser = async (req, res) => {
      let message = await userService.createNewUser(req.body);
      console.log(message);
      return res.status(200).json(message);
};

const handleEditNewUser = async (req, res) => {
      let data = req.body;
      let message = await userService.updateUserData(data);
      return res.status(200).json(message);
};

const changePassword = async (req, res) => {
      let data = req.body;
      let message = await userService.changePassword(data);
      return res.status(200).json(message);
};

const forgotPassword = async (req, res) => {
      let email = req.body.email;
      let message = await userService.forgotPassword(email);
      return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
      if (!req.body.id) {
            return res.status(200).json({
                  errCode: 1,
                  errMessage: "Missing parameter",
            });
      }
      let message = await userService.deleteUser(req.body.id);
      return res.status(200).json(message);
};

const handleContactUsByEmail = async (req, res) => {
      let email = req.body.email;
      let phoneNumber = req.body.phoneNumber;
      let title = req.body.title;
      let firstName = req.body.firstName;
      let desc = req.body.desc;
      const message = await userService.contactUsByEmail(email, phoneNumber, firstName, desc, title);
      return res.status(200).json(message);
};

const handleEnabledUser = async (req, res) => {
      let id = req.body.data.id;
      let status = req.body.data.status;
      const message = await userService.enabledUser(id, status);
      return res.status(200).json(message);
};

module.exports = {
      handleLogin: handleLogin,
      handleGetAllUsers: handleGetAllUsers,
      handleEditNewUser: handleEditNewUser,
      handleDeleteUser: handleDeleteUser,
      handleCreateNewUser: handleCreateNewUser,
      handleLogin: handleLogin,
      changePassword: changePassword,
      forgotPassword: forgotPassword,
      handleContactUsByEmail: handleContactUsByEmail,
      handleEnabledUser: handleEnabledUser,
};
