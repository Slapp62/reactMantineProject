import { Router } from "express";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/auth.js";
import {
  getListingById,
  deleteListingById,
  createListing,
  getAllListings,
  editListing,
} from "../services/listingService.js";
import { handleError } from "../utils/errorHandler.js";
import { validator } from "../middleware/validatorService.js";
import chalk from "chalk";
dotenv.config();

const listingRouter = Router();

listingRouter.get("/", async (_req, res) => {
  try {
    const response = await getAllListings();
    res.json(response);
  } catch (error) {
    handleError(res, error.status || 500, "Error fetching listings");
  }
});

listingRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const currentBizId = req.params.id;
    const businessListings = await getListingById(currentBizId);
    res.status(200).json(businessListings);
  } catch (error) {
    handleError(res, error.status || 500, "Error fetching listing by ID");
  }
});

listingRouter.post("/create", validator, async (req, res) => {
  try {
    const newListing = await createListing(req.body);

    console.log(chalk.blueBright("Listing Created Successfully"));

    res.status(201).json({
      message: "Listing Created Successfully",
      listing: newListing,
    });
  } catch (error) {
    handleError(res, error.status || 500, "Error creating listing");
  }
});

listingRouter.patch("/edit/:id", verifyToken, async (req, res) => {
  try {
    const listingID = req.params.id;
    const updatedListing = await editListing(listingID, req.body);

    res.status(200).json({
      message: "Listing Updated Successfully",
      listing: updatedListing,
    });
  } catch (error) {
    handleError(res, error.status || 500, "Error updating listing");
  }
});

listingRouter.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const listingID = req.params.id;
    const deleteListing = await deleteListingById(listingID);
    res.status(204).json(deleteListing);
  } catch (error) {
    handleError(res, error.status || 500, "Error deleting listing");
  }
});

export default listingRouter;
