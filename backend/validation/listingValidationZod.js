import * as z from 'zod';
import { INDUSTRIES } from '../data/industries.js';
import { WORK_ARRANGEMENTS } from '../data/workArr.js';

export const zodListingValidator = (listing) => {
  const listingSchema = z.object({
    jobTitle: z.string().min(5, { message: 'Job title is too short' }),
    jobDescription: z.string().min(10, { message: 'Job description is too short' }),
    requirements: z.array().optional(),
    advantages: z.array().optional(),
    apply: z.object({
      method: z.enum(['email', 'link']),
      contact: z.string(),
    }),
    location: z.object({
      region: z.string('Region is required'),
      city: z.string('City is required'),
    }),
    workArrangement: z.enum(WORK_ARRANGEMENTS, { required_error: 'Work Arrangement is required' }),
    industry: z.enum(INDUSTRIES, { required_error: 'Industry is required' }),
  });

  return listingSchema.safeParse(listing);
};