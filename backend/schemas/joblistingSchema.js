import { Schema, model } from "mongoose";
import { INDUSTRIES } from "../data/industries.js";
import { WORK_ARRANGEMENTS } from "../data/workArr.js";
import { CITIES, REGIONS } from "../data/israelCities.js";

const jobListingSchema = new Schema({
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  requirements: [String],
  advantages: [String],
  apply: {
    method: { type: String, enum: ["email", "link"], required: true },
    contact: { type: String, required: true }, // email address or URL
  },
  location: {
    region: { 
      type: String, 
      enum: REGIONS,
      required: true 
    },
    city: { 
      type: String, 
      enum: CITIES,
      required: true 
    },
  },
  workArrangement: {
    type: String,
    enum: WORK_ARRANGEMENTS,
    required: true,
  },
  industry: {
    type: String,
    enum: INDUSTRIES,
    required: true,
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

export const JobListing = model("JobListings", jobListingSchema);
