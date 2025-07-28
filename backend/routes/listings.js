import { Router } from "express";
import { JobListing } from "../models/schemas.js";
import dotenv from "dotenv";
dotenv.config();

const listingRouter = Router();

listingRouter.get("/", async (_req, res) => {
  try {
    const response = await JobListing.find();
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

listingRouter.post("/create", async (req, res) => {
  console.log(req.body);

  try {
    const newListing = new JobListing(req.body);
    await newListing.save();

    res.status(201).json({
      message: "Listing Created Successfully",
      listing: newListing,
    });
  } catch (error) {
    console.error("listing creation error", error);
  }
});

export default listingRouter;
