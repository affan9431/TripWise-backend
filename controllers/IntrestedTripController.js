const IntrestedTrip = require("../models/IntrestedTripModel");
const AppError = require("../utils/AppError");

exports.getIntrestedTrips = async (req, res, next) => {
  try {
    const { category } = req.query;

    console.log(category);
    console.log(typeof category);
    if (!category) {
      return next(new AppError("Category parameter is required", 400));
    }

    const Trips = await IntrestedTrip.find({ category: category });


    res.status(200).json({
      status: "success",
      results: Trips.length,
      data: Trips,
    });
  } catch (error) {
    return next(new AppError("Failed to get interested trips", 500));
  }
};
