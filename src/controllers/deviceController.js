/** @format */

// /** @format */
import deviceService from "../services/deviceService";

const handleGetDevice = async (req, res) => {
      let idDevice = req.query.idDevice;
      let dataDevice = await deviceService.getDevice(idDevice);
      return res.status(200).json(dataDevice);
};

const handleAddDevice = async (req, res) => {
      let dataDevice = req.body;
      const message = await deviceService.addDevice(dataDevice);
      return res.status(200).json(message);
};

const handleUpdateDevice = async (req, res) => {
      let idDevice = req.body.id;
      let newName = req.body.newName;
      const message = await deviceService.updateDevice(newName, idDevice);
      return res.status(200).json(message);
};

const handeDeleteDevice = async (req, res) => {
      let idDevice = req.body.id;
      const message = await deviceService.deleteDevice(idDevice);
      return res.status(200).json(message);
};

const handleSetStatusDevice = async (req, res) => {
      let id = req.body.data.id;
      let status = req.body.data.status;
      console.log(status);
      const message = await deviceService.setStatusDevice(id, status);
      return res.status(200).json(message);
};

module.exports = {
      handleGetDevice: handleGetDevice,
      handleAddDevice: handleAddDevice,
      handleUpdateDevice: handleUpdateDevice,
      handeDeleteDevice: handeDeleteDevice,
      handleSetStatusDevice: handleSetStatusDevice,
};
