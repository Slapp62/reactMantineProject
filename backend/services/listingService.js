import { JobListing } from "../models/schemas.js";
import chalk from "chalk";

export const getAllListings = async () => {
  try {
    return await JobListing.find();
  } catch (error) {
    console.error(error);
  }
}

export const getListingById = async (currentBizId) => {
  try {
    return await JobListing.find({businessId: {$eq: currentBizId }})
  } catch (error) {
    console.error(error);
  }
};

export const deleteListingById = async (listingId) => {
  try {
    const response = await JobListing.findByIdAndDelete(listingId);
    console.log(chalk.blue('delete successfull'));

    return response
  } catch (error) {
    console.error(error);
  }  
};

export const createListing = async (listing) => {
  try {
  return await JobListing.create(listing); 
  } catch (error) {
    console.error(error);
  }
};

