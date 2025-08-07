import { User, Business, Jobseeker } from "../models/schemas.js";
import bcrypt from "bcryptjs";
import chalk from "chalk";
import jwt from "jsonwebtoken";

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

export const registerBusiness = async (registerData) => {
  try {
    const {
      email,
      password,
      userType,
      companyName,
      industry,
      city,
      description,
      logo,
      website,
      socialLinks,
    } = registerData;

    const savedUser = await createNewUser(email, password, userType);

    const newBusiness = new Business({
      userId: savedUser._id,
      companyName,
      industry,
      city,
      description,
      logo,
      website,
      socialLinks,
    });

    const savedBusiness = await newBusiness.save();

    // eslint-disable-next-line no-unused-vars
    const { password: userPassword, ...userNoPassword } = savedUser.toObject();
    
    console.log(chalk.blue("Business registered"));

    return {
      userData: userNoPassword,
      profileData: savedBusiness
    };
  } catch (error) {
    console.error(error);
  }
};

export const registerJobseeker = async (registerData) => {
  try {
    const {
      email,
      password,
      userType,
      region,
      city,
      industry,
      preferredWorkArr,
      description,
      linkedIn,
    } = registerData;

    const savedUser = await createNewUser(email, password, userType);

    const newJobseeker = new Jobseeker({
      userId: savedUser._id,
      region,
      city,
      industry,
      preferredWorkArr,
      description,
      linkedIn,
    });

    const savedJobseeker = await newJobseeker.save();

    // eslint-disable-next-line no-unused-vars
    const { password: userPassword, ...userNoPassword } = savedUser.toObject();
    
    console.log(chalk.blue("Jobseeker registered"));

    return {
      userData: userNoPassword,
      profileData: savedJobseeker
    };

  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (user) => {
  try {
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    let userData;

    if (user.userType === "business") {
      userData = await Business.findOne({ userId: { $eq: user._id } });
    }

    if (user.userType === "jobseeker") {
      userData = await Jobseeker.findOne({ userId: { $eq: user._id } });
    }

    // eslint-disable-next-line no-unused-vars
    const { password: userPassword, ...userNoPassword } = user.toObject();

    const data = {
      userData: userNoPassword,
      profileData: userData,
    };

    console.log(chalk.blue("Login successful"));
    return { data, token };
  } catch (error) {
    console.error(error);
  }
};