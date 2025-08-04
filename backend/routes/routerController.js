import { Router } from "express";
import userRouter from "./usersController.js";
import listingRouter from "./listingsController.js";
import authRouter from "./authController.js";

const router = Router();

// main api router
router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/listings", listingRouter);

export default router;