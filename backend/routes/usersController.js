import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import dotenv from "dotenv";
import {
  getAllUsers,
  getUserDataById,
  toggleFavorite,
} from "../services/userService.js";
dotenv.config();

const userRouter = Router();

userRouter.get("/", async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await getUserDataById(userId);

    res.json({
      message: "Persisted Login Successful",
      user: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/favorites/toggle/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const listingId = req.params.id;

    const updatedUser = await toggleFavorite(listingId, userId);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
