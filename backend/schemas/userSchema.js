import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    lowerCase: true,
    required: true,
    match: RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["jobseeker", "business"],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model("User", userSchema);
