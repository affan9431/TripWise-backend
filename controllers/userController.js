const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

function generateToken(userObj) {
  return jwt.sign(userObj, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_AT,
  });
}

exports.signUp = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return next(new AppError("Missing required fields", 400));

    const user = await User.findOne({ email });

    if (user) return next(new AppError("Email already in use", 400));

    const newUser = await User.create({ fullName, email, password });

    const userObj = {
      name: newUser.fullName,
      id: newUser._id,
      email: newUser.email,
    };

    const token = generateToken(userObj);

    res.status(201).json({
      status: "Success",
      message: "User created",
      token,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError("Failed to create user", 404));
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Missing required fields", 400));

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password, user.password)))
      return next(new AppError("Invalid credentials", 400));

    const userObj = {
      name: user.fullName,
      id: user._id,
      email: user.email,
    };

    const token = generateToken(userObj);

    res.status(200).json({
      status: "Success",
      message: "Logged in",
      token,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError("Authentication failed", 404));
  }
};

exports.addFovouriteTrip = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { tripId } = req.body;
    if (!userId || !tripId)
      return next(new AppError("Missing required fields", 400));

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favouritesTrips: tripId }, // 👈 magic
      },
      { new: true },
    );

    res
      .status(200)
      .json({ status: "Success", message: "Trip added as a favourite  trip." });
  } catch (error) {
    console.error(error);
    return next(new AppError("Failed to add favourite trip", 404));
  }
};

exports.removeFavouriteTrip = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { tripId } = req.body;

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favouritesTrips: tripId },
      },
      { new: true },
    );

    res.status(200).json({
      status: "success",
      message: "Trip removed from favourites",
    });
  } catch (error) {
    return next(new AppError("Failed to remove favourite trip", 500));
  }
};

exports.getFavouritesTrips = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) return next(new AppError("Missing required fields", 400));

    const user = await User.findById(userId);
    res.status(200).json({
      status: "success",
      data: user.favouritesTrips,
    });
  } catch (error) {
    return next(new AppError("Failed to get favourite trips", 500));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { fullName } = req.body;

    if (!fullName || !userId)
      return next(new AppError("Missing required fields", 400));
    const user = await User.findByIdAndUpdate(
      userId,
      { fullName },
      {
        new: true,
        runValidators: true,
        select: "-password -__v",
      },
    );
    console.log(user);

    const token = generateToken({
      name: user.fullName,
      id: user._id,
      email: user.email,
    });

    res.status(200).json({
      status: "success",
      token,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return next(new AppError("Failed to update user", 500));
  }
};
