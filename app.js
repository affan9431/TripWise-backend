const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(".env");
const app = express();

const userRouter = require("./routers/userRouter");
const tripRouter = require("./routers/tripRouter");
const intrestedTripRouter = require("./routers/IntrestedTripRouter");
const chatbotRouter = require("./routers/chatbotRouter");
const AppError = require("./utils/AppError");


const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.log(`${err}`);
    process.exit(1);
  });

app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/trips", tripRouter);
app.use("/api/v1/intrestedTrips", intrestedTripRouter);
app.use("/api/v1/chatbot", chatbotRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// ⭐ Global Error Handler (MUST be last)
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
