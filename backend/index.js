/* eslint-disable no-unused-vars */
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import { handleError } from "./utils/errorHandler.js";
import connectDB from "./middleware/mongoConnect.js";
import router from "./routes/routerController.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connection to database
connectDB();

// global middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(json());
app.use(router)

// error handler
app.use((error, req, res, next) => {
  handleError(res, error.status || 500, error.message);
});

// listen
app.listen(PORT, () => {
  console.log(chalk.green.bold(`server running on port ${PORT}`));
});
