const mongoose = require("mongoose");
// Room Size Schema
const roomSizeSchema = new mongoose.Schema(
  {
    capacity: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

// Hotel Schema
const hotelSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    hotelName: {
      type: String,
      required: true,
    },
    hotelImage: {
      type: String,
      required: true,
    },
    hotelDescription: {
      type: String,
      required: true,
    },
    estimatedCostPerNight: {
      type: Number,
      required: true,
    },
    maxMembersPerRoom: {
      type: Number,
      required: true,
    },
    otherRoomSize: [roomSizeSchema],
    address: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// Place Schema
const placeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    placeName: {
      type: String,
      required: true,
    },
    placeImage: {
      type: String,
      required: true,
    },
    timeNeeded: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    crowdLevel: {
      type: String,
      required: true,
      enum: ["Very Busy", "Busy", "Moderate", "Quiet"],
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

// Cafe Schema
const cafeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    cafeName: {
      type: String,
      required: true,
    },
    averageCost: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

// Main Trip Schema
const IntrestedTripSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    estimatedCost: {
      type: Number,
      required: true,
    },
    bufferCost: {
      type: Number,
      required: true,
    },
    tripStyle: {
      type: String,
      required: true,
    },

    hotels: [hotelSchema],
    places: [placeSchema],
    cafes: [cafeSchema],
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  },
);

// Create and export the model
const IntrestedTrip = mongoose.model("IntrestedTrip", IntrestedTripSchema);

module.exports = IntrestedTrip;
