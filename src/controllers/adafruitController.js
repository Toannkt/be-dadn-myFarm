/** @format */

// /** @format */

import userService from "../services/userService";

// const handleGetDataAdafruit = async (feed_name) => {
//       const message = await adafruitService.getDataAdafruit(feed_name);
//       return res.status(200).json(message);
// };

// module.exports = {
//       handleGetDataAdafruit: handleGetDataAdafruit,
// };

let handleGetAllUsers = async (idUser, req, res) => {
      let id = idUser;
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

module.exports = {
      handleGetAllUsers: handleGetAllUsers,
};
