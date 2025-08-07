import { JobListing } from "../models/schemas.js";

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
    return await JobListing.findByIdAndDelete(listingId);
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

