import { Schema, model } from "mongoose";
import { INDUSTRIES } from "../data/industries.js";
import { WORK_ARRANGEMENTS } from "../data/workArr.js";
import { CITIES, REGIONS } from "../data/israelCities.js";


const jobseekerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  industry: {
    type: String,
    enum: INDUSTRIES,
  },
  region: {
    type: String,
    enum: REGIONS,
  },
  city: {
    type: String,
    enum: CITIES,
  },

  linkedIn: String,
  preferredWorkArr: {
    type: String,
    enum: WORK_ARRANGEMENTS,
  },
  favorites: [String],
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Jobseeker = model("Jobseeker", jobseekerSchema);
