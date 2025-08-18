import * as z from "zod";
import { INDUSTRIES } from "../data/industries.js";
import { WORK_ARRANGEMENTS } from "../data/workArr.js";

export const zodListingValidator = (listing) => {
  const listingSchema = z.object({
    jobTitle: z.string().min(5, { message: "Job title is too short" }),
    jobDescription: z
      .string()
      .min(10, { message: "Job description is too short" }),
    requirements: z.array(z.string()).optional(),
    advantages: z.array(z.string()).optional(),
    apply: z.object({
      method: z.enum(["email", "link"]),
      contact: z.string(),
    }),
    location: z.object({
      region: z.string("Region is required"),
      city: z.string("City is required"),
    }),
    workArrangement: z.enum(WORK_ARRANGEMENTS, {
      required_error: "Work Arrangement is required",
    }),
    industry: z.enum(INDUSTRIES, { required_error: "Industry is required" }),
  });

  try {
    const parsedListing = listingSchema.safeParse(listing);
    //console.log('parsedListing', parsedListing);
    return parsedListing;
  } catch (error) {
    //console.log('Zod validation error:', error);
    return { success: false, error };
  }
};
