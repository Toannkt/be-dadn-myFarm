/** @format */

import historyService from "../services/historyService";

const handleGetAllHistoryEquiptById = async (req, res) => {
      console.log(req.query);
      const idEquipt = req.query.idEquipt;
      const typeEquipt = req.query.type;
      const message = await historyService.getAllHistory(idEquipt, typeEquipt);
      return res.status(200).json(message);
};
// const handleSaveHistorySensor = async (req, res) => {
//       let type = req.body.type;
//       let id_equip = req.body.id_equip;
//       const message = await historyService.saveHistorySensor(type, id_equip);
//       return res.status(200).json(message);
// };

const handleDeleteHistory = async (req, res) => {
      let idHistory = req.body.id;
      const message = await historyService.deleteHistory(idHistory);
      return res.status(200).json(message);
};

const handleClearHistoryByType = async (req, res) => {
      let type = req.body.type;
      const message = await historyService.clearHistoryByType(type);
      return res.status(200).json(message);
};

module.exports = {
      // handleSaveHistorySensor: handleSaveHistorySensor,
      handleGetAllHistoryEquiptById: handleGetAllHistoryEquiptById,
      handleDeleteHistory: handleDeleteHistory,
      handleClearHistoryByType: handleClearHistoryByType,
};
