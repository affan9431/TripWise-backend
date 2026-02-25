const express = require("express");
const tripController = require("../controllers/tripController");

const routes = express.Router();

routes.get("/", tripController.getAllTrips);
routes.get("/filterTrips", tripController.getFilterTrips);

module.exports = routes;
