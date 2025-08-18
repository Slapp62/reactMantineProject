import { connect } from "mongoose";
import chalk from "chalk";

export const connectLocalDB = async () => {
  try {
    await connect(process.env.MONGO_LOCAL_URI);
    console.log(chalk.green.bold("MongoDB connected locally."));
  } catch (error) {
    console.error("MongoDB-Local connection error", error);
    process.exit(1);
  }
};
