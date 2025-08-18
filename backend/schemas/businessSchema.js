import { Schema, model } from "mongoose";
import { INDUSTRIES } from "../data/industries.js";

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

export const Business = model("Business", businessSchema);
