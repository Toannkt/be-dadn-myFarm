/** @format */

import express from "express";
import adafruitController from "../controllers/adafruitController";
import locationController from "../controllers/locationController";
import deviceController from "../controllers/deviceController";
import sensorController from "../controllers/sensorController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
      //userController
      router.post("/api/login", userController.handleLogin);
      router.get("/api/get-all-users", userController.handleGetAllUsers);
      router.post("/api/create-new-user", userController.handleCreateNewUser);
      router.put("/api/edit-user", userController.handleEditNewUser);
      router.put("/api/change-password", userController.changePassword);
      router.delete("/api/delete-user", userController.handleDeleteUser);
      router.post("/api/forgot-password", userController.forgotPassword);

      //locationController
      router.get("/api/get-location-by-id", locationController.handleGetLocation);
      router.post("/api/add-location", locationController.handleAddLocation);
      router.put("/api/update-name-location", locationController.handleUpdateLocation);
      router.delete("/api/delete-location", locationController.handleDeleteLocation);

      //deviceController (pump, led)
      router.get("/api/get-device", deviceController.handleGetDevice);
      router.post("/api/add-device", deviceController.handleAddDevice);
      router.put("/api/update-device", deviceController.handleUpdateDevice);
      router.delete("/api/delete-device", deviceController.handeDeleteDevice);
      router.put("/api/set-status-device", deviceController.handleSetStatusDevice);
      router.get("/api/get-all-device", deviceController.handleGetAllDevice);

      //sensorController
      router.get("/api/get-sensor", sensorController.handleGetSensor);
      router.post("/api/add-sensor", sensorController.handleAddSensor);
      router.put("/api/update-sensor", sensorController.handleUpdateSensor);
      router.delete("/api/delete-sensor", sensorController.handleDeleteSensor);
      router.get("/api/get-all-sensor", sensorController.handleGetAllCode);
      router.get("/api/get-all-history-sensor-by-id", sensorController.handleGetAllHistorySensorById);
      router.post("/api/warn-condition-sensor", sensorController.handleLimitThresholdWarning);

      //getDataFromAdafruit
      router.get("/api/get-adafruit", adafruitController.handleGetDataAdafruit);
      //Sensor

      return app.use("/", router);
};

module.exports = initWebRoutes;
