import { connect } from "mongoose";
import chalk from "chalk";

export const connectAtlasDB = async () => {
  try {
    await connect(process.env.MONGO_ATLAS_URI);
    console.log(chalk.green.bold("MongoDB connected to Atlas."));
  } catch (error) {
    console.error("MongoDB-Atlas connection error", error);
    process.exit(1);
  }
};
