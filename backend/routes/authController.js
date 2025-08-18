import { Router } from "express";
import dotenv from "dotenv";
import {
  loginUser,
  registerBusiness,
  registerJobseeker,
} from "../services/authService.js";
import { verifyUser } from "../middleware/auth.js";
dotenv.config();

const authRouter = Router();

authRouter.post("/register/business", async (req, res) => {
  try {
    const data = await registerBusiness(req.body);

    res.status(201).json({
      message: "Business registered successfully",
      user: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/register/jobseeker", async (req, res) => {
  try {
    const data = await registerJobseeker(req.body);

    res.status(201).json({
      message: "Jobseeker registered successfully",
      user: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.post("/login", verifyUser, async (req, res) => {
  try {
    const { data, token } = await loginUser(req.user);

    res.json({
      message: "Login successful",
      token,
      user: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default authRouter;
