import { Schema, model } from "mongoose";
import { INDUSTRIES } from "../data/industries.js";
import { WORK_ARRANGEMENTS } from "../data/workArr.js";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: String,
    enum: ["jobseeker", "business"],
    required: true,
  },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const jobseekerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  industry: {
    type: String,
    enum: INDUSTRIES,
  },
  region: { type: String },
  city: { type: String },
  linkedIn: { type: String },
  preferredWorkArr: {
    type: String,
    enum: WORK_ARRANGEMENTS,
  },
  favorites: [String],
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const businessSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  industry: {
    type: String,
    enum: INDUSTRIES,
    required: true,
  },
  logo: { type: String, default: null },
  city: { type: String, required: true },
  website: { type: String, default: null },
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String,
  },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

const jobListingSchema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: "Business", required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  requirements: [String],
  advantages: [String],
  apply: {
    method: { type: String, enum: ["email", "link"], required: true },
    contact: { type: String, required: true }, // email address or URL
  },
  location: {
    region: { type: String, required: true },
    city: { type: String, required: true }
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

export const User = model("User", userSchema);
export const Jobseeker = model("Jobseeker", jobseekerSchema);
export const Business = model("Business", businessSchema);
export const JobListing = model("JobListing", jobListingSchema);
