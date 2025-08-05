import { Router } from "express";
import { JobListing } from "../models/schemas.js";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/auth.js";
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

listingRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const currentBizId = req.params.id
    const businessListings = await JobListing.find({businessId: {$eq: currentBizId }})
    res.status(200).json(businessListings)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

listingRouter.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const listingID = req.params.id;
    const deleteListing = await JobListing.findByIdAndDelete(listingID);
    res.status(204).json(deleteListing)
    console.log('delete successfull');
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export default listingRouter;
