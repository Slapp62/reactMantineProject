import { connect } from "mongoose";
import chalk from "chalk";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log(chalk.green.bold("MongoDB connected"));
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;