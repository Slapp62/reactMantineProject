/* eslint-disable no-unused-vars */
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import { handleError } from "./utils/errorHandler.js";
import router from "./routes/routerController.js";
import { connectToDB } from "./database/dbService.js";
dotenv.config();

const app = express();

// global middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(json());
app.use(router);

// error handler
app.use((error, req, res, next) => {
  handleError(res, error.status || 500, error.message);
});

// listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`server running on port ${PORT}`));
  connectToDB();
});
