const express = require("express");
const userController = require("../controllers/userController");

const routes = express.Router();

routes.post("/signUp", userController.signUp);
routes.post("/logIn", userController.logIn);
routes.patch("/addFavorites/:userId", userController.addFovouriteTrip);
routes.patch("/removeFavorites/:userId", userController.removeFavouriteTrip);
routes.get("/getFavorites/:userId", userController.getFavouritesTrips);
routes.patch("/updateUser/:userId", userController.updateUser);

module.exports = routes;
