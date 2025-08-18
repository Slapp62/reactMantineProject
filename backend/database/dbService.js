import { connectAtlasDB } from "./mongoDB/connectAtlas.js";
import { connectLocalDB } from "./mongoDB/connectLocally.js";

const ENV = "dev";

export const connectToDB = async () => {
  if (ENV === "dev") {
    await connectLocalDB();
  }
  if (ENV === "prod") {
    await connectAtlasDB();
  }
};
