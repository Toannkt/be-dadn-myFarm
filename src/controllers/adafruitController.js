/** @format */

import adafruitService from "../services/adafruitService";

const handleGetDataAdafruit = async (req, res) => {
      const message = await adafruitService.getDataAdafruit();
      return res.status(200).json(message);
};

module.exports = {
      handleGetDataAdafruit: handleGetDataAdafruit,
};
