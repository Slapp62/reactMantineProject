import { Router } from "express";
import { Business, User, Jobseeker } from "../models/schemas.js";
import { verifyToken, validateObjectIdParam } from "../middleware/auth.js";
import { sanitizeInput } from "../middleware/validation.js";
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

userRouter.get("/:id", 
  validateObjectIdParam('id'),
  verifyToken,
  async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const requestingUserId = req.user.userId;
    
    // Authorization check: users can only access their own data
    if (requestedUserId !== requestingUserId) {
      return res.status(403).json({ error: "Access denied. You can only access your own profile." });
    }
    
    const user = await User.findById(requestedUserId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

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

userRouter.put("/favorites/toggle/:id", 
  validateObjectIdParam('id'),
  verifyToken, 
  sanitizeInput,
  async (req, res) => {
  try {
    const userId = req.user.userId;
    const listingId = req.params.id;
    
    const jobseeker = await Jobseeker.findOne({ userId: { $eq: userId } });
    
    if (!jobseeker) {
      return res.status(404).json({ error: "Jobseeker profile not found" });
    }

    if (jobseeker.favorites.includes(listingId)) {
      jobseeker.favorites = jobseeker.favorites.filter((id) => id !== listingId);
    } else {
      jobseeker.favorites.push(listingId);
    }

    const updatedJobseeker = await jobseeker.save();
    res.json({
      message: "Favorites updated successfully",
      favorites: updatedJobseeker.favorites
    });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
