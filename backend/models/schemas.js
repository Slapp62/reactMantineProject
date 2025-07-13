import { Schema, model } from 'mongoose';
import { INDUSTRIES } from '../data/industries';
import { WORK_ARRANGEMENTS } from '../data/workArr';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { 
    type: String, 
    enum: ['jobseeker', 'business'], 
    required: true 
  },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const businessSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  industry: { 
    type: String, 
    enum: INDUSTRIES,
    required: true 
  },
  logo: { type: String }, // URL to logo image
  city: { type: String, required: true },
  website: { type: String },
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String
  },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const jobListingSchema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  requirements: [String], // Array of requirement strings
  applicationMethod: {
    type: { type: String, enum: ['email', 'link'], required: true },
    value: { type: String, required: true } // email address or URL
  },
  location: {
    city: String, // If different from company location
    isRemote: Boolean,
    workArrangement: { 
      type: String, 
      enum: WORK_ARRANGEMENTS,
      required: true 
    }
  },
  industry: String, // If different from company industry
  salaryRange: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'ILS' }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date
});

export const User = model('User', userSchema);
export const Business = model('Business', businessSchema);
export const JobListing = model('JobListing', jobListingSchema);