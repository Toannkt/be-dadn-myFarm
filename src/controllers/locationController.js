/** @format */
import locationService from "../services/locationService";

const handleGetLocation = async (req, res) => {
      let idLocation = req.body.id;
      const data = await locationService.getLocation(idLocation);
      return res.status(200).json(data);
};

const handleAddLocation = async (req, res) => {
      let name = req.body.name;
      let idUser = req.body.idUser;
      const message = await locationService.addLocation(name, idUser);
      return res.status(200).json(message);
};

const handleUpdateLocation = async (req, res) => {
      let newName = req.body.newName;
      let id = req.body.id;
      const message = await locationService.updateLocation(newName, id);
      return res.status(200).json(message);
};

const handleDeleteLocation = async (req, res) => {
      let idLocation = req.body.id;
      const message = await locationService.deleteLocation(idLocation);
      return res.status(200).json(message);
};

module.exports = {
      handleGetLocation: handleGetLocation,
      handleAddLocation: handleAddLocation,
      handleUpdateLocation: handleUpdateLocation,
      handleDeleteLocation: handleDeleteLocation,
};
