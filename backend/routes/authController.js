import { Router } from "express";
import { Business, User, Jobseeker } from "../models/schemas.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createNewUser } from "../utils/createUserHelper.js";
dotenv.config();

const authRouter = Router();

authRouter.post("/register/business", async (req, res) => {
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
    } = req.body;

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

    res.status(201).json({
      message: "Business registered successfully",
      user: {
        userNoPassword,
        savedBusiness,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/register/jobseeker", async (req, res) => {
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
    } = req.body;

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

    res.status(201).json({
      message: "Jobseeker registered successfully",
      user: {
        userNoPassword,
        savedJobseeker,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
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

    const combinedData = {
      userData: userNoPassword,
      profileData: userData,
    };

    res.json({
      message: "Login successful",
      token,
      user: combinedData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default authRouter;