/* eslint-disable no-unused-vars */
import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import userRouter from "./routes/users.js";
import listingRouter from "./routes/listings.js";
import dotenv from "dotenv";
import chalk from "chalk";
import { handleError } from "./utils/errorHandler.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connection to database
const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log(chalk.green.bold("MongoDB connected"));
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};
connectDB();

// global middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(json());

// api router
app.use("/api/users", userRouter);
app.use("/api/listings", listingRouter);

// error handler
app.use((error, req, res, next) => {
  handleError(res, error.status || 500, error.message);
});

// listen
app.listen(PORT, () => {
  console.log(chalk.yellow.bold(`server running on port ${PORT}`));
});
