/** @format */

import db from "../models/index";
import userService from "./userService";
import axios from "axios";

const getDataAdafruit = (feed_name) => {
      return new Promise(async (resolve, reject) => {
            try {
                  // make axios post request
                  const res = await axios.get(`https://io.adafruit.com/api/v2/nhandangnamthien/feeds/${feed_name}`);
                  // const res = await axios.get(`https://io.adafruit.com/api/v2/khactoan4321/feeds/${feed_name}`);
                  resolve({
                        name: res.data.name,
                        enabled: res.data.enabled,
                        last_value: res.data.last_value,
                        created_at: res.data.created_at,
                        updated_at: res.data.updated_at,
                  });
            } catch (error) {
                  reject(error);
            }
      });
};
module.exports = {
      getDataAdafruit: getDataAdafruit,
};
