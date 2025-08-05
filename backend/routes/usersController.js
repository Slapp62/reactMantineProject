import { Router } from "express";
import { Business, User, Jobseeker } from "../models/schemas.js";
import { verifyToken } from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const userRouter = Router();


userRouter.get("/", async (_req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const user = await User.findById(userId);

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
      message: "Persisted Login Successful",
      user: combinedData,
    });

    console.log("user by id", user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/favorites/toggle/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const listingId = req.params.id;
    
    const user = await Jobseeker.findOne({ userId: { $eq: userId } });

    if (user.favorites.includes(listingId)) {
      user.favorites = user.favorites.filter((id) => id !== listingId);
    } else {
      user.favorites.push(listingId);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
