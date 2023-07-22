/** @format */

import db from "../models/index";
import axios from "axios";

const getDataAdafruit = () => {
      return new Promise(async (resolve, reject) => {
            try {
                  // make axios post request
                  const res = await axios.get("https://io.adafruit.com/api/v2/nhandangnamthien/feeds/v4");
                  resolve(res.data);
            } catch (error) {
                  reject(error);
            }
      });
};

module.exports = {
      getDataAdafruit: getDataAdafruit,
};
