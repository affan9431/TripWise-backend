const express = require("express");
const tripController = require("../controllers/IntrestedTripController");

const routes = express.Router();

routes.get("/", tripController.getIntrestedTrips);

module.exports = routes;
