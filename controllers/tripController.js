const Trip = require("../models/tripModel");
const AppError = require("../utils/AppError");

// TODO: MAKE THIS FILTER TRIP FUNCTION ACCURATE FOR MORE GROUPSIZE WHERE WE HAVE TO MAP THROUGH OTHERROOMSIZE IN DATABASE

exports.getFilterTrips = async (req, res, next) => {
  try {
    const { budget, tripStyle, groupSize } = req.query;

    let query = {
      $and: [
        { estimatedCost: { $lte: Number(budget) } },
        { tripStyle: tripStyle },
        { hotels: { $elemMatch: { maxMembersPerRoom: { $eq: groupSize } } } },
      ],
    };

    const trips = await Trip.find(query);
    res.status(200).json({
      status: "Success",
      message: "Fliter Trips Successfully",
      data: trips,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError("Filter Trip Error!", 404));
  }
};

exports.getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res
      .status(200)
      .json({
        status: "Success",
        message: "Get All Trips Successfully",
        length: trips.length,
        data: trips,
      });
  } catch (error) {
    console.log(error);
    return next(new AppError("Get All Trips Error!", 404));
  }
};
