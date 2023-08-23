/** @format */

import sensorService from "../services/sensorService";

const handleGetSensor = async (req, res) => {
      let idSensor = req.query.idSensor;
      const message = await sensorService.getSensor(idSensor);
      return res.status(200).json(message);
};

const handleAddSensor = async (req, res) => {
      const dataSensor = req.body;
      const message = await sensorService.addSensor(dataSensor);
      return res.status(200).json(message);
};

const handleUpdateSensor = async (req, res) => {
      const minLimited = req.body.minLimited;
      const maxLimited = req.body.maxLimited;
      const idSensor = req.body.idSensor;
      const message = await sensorService.updateSensor(minLimited, maxLimited, idSensor);
      return res.status(200).json(message);
};

const handleDeleteSensor = async (req, res) => {
      const idSensor = req.body.id;
      const message = await sensorService.deleteSensor(idSensor);
      return res.status(200).json(message);
};

const handleLimitThresholdWarning = async (req, res) => {
      const email = req.body.email;
      const nameLocation = req.body.nameLocation;
      const descCondition = req.body.descCondition;
      const message = await sensorService.limitThresholdWarning(email, nameLocation, descCondition);
      return res.status(200).json(message);
};

module.exports = {
      handleGetSensor: handleGetSensor,
      handleAddSensor: handleAddSensor,
      handleUpdateSensor: handleUpdateSensor,
      handleDeleteSensor: handleDeleteSensor,
      handleLimitThresholdWarning: handleLimitThresholdWarning,
};
