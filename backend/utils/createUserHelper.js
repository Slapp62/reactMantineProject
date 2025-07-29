import { User } from "../models/schemas.js";
import bcrypt from "bcryptjs";

export const createNewUser = async (email, password, userType) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    email,
    password: hashedPassword,
    userType: userType,
  });

  return await newUser.save();
};