import { Router } from "express";
import { JobListing, Business } from "../models/schemas.js";
import { verifyToken, validateObjectIdParam } from "../middleware/auth.js";
import { validateRequest, createListingSchema, updateListingSchema, sanitizeInput } from "../middleware/validation.js";
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

listingRouter.post("/create", 
  verifyToken,
  sanitizeInput,
  validateRequest(createListingSchema),
  async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Verify user is a business
    const business = await Business.findOne({ userId });
    if (!business) {
      return res.status(403).json({ error: "Only businesses can create job listings" });
    }
    
    // Add business ID to the listing
    const listingData = {
      ...req.body,
      businessId: business._id
    };
    
    const newListing = new JobListing(listingData);
    await newListing.save();

    res.status(201).json({
      message: "Listing created successfully",
      listing: newListing,
    });
  } catch (error) {
    console.error("Listing creation error:", error);
    res.status(500).json({ error: "Failed to create listing" });
  }
});

export default listingRouter;
