// Base User type (authentication)
export type TUser = {
  _id: string;
  email: string;
  password: string;
  userType: 'jobseeker' | 'business';
  isVerified: boolean;
  createdAt: string;
};

// Job Seeker Profile
export type TJobseeker = {
  _id: string;
  userId: string; // Reference to User._id
  industry?: string;
  city?: string;
  linkedIn?: string;
  preferredWorkArr?: string;
  description?: string;
  createdAt: string;
};

// Business Profile  
export type TBusiness = {
  _id: string;
  userId: string; // Reference to User._id
  companyName: string;
  industry: string;
  logo?: string | null;
  city: string;
  website?: string | null;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  description?: string;
  createdAt: string;
};

// Job Listing
export type TJobListing = {
  _id: string;
  businessId: string; // Reference to Business._id
  jobTitle: string;
  jobDescription: string;
  requirements: string[];
  advantages: string[];
  applicationMethod: {
    type: 'email' | 'link';
    value: string;
  };
  location?: {
    city?: string;
  };
  workArrangement: string;
  industry?: string;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
};

// JWT Token payload (for authentication)
export type TDecodedToken = {
  userId: string;
  email: string;
  userType: 'jobseeker' | 'business';
  iat: number;
  exp: number;
};

// API Response types
export type TAuthResponse = {
  message: string;
  token: string;
  user: Omit<TUser, 'password'>; // User without password field
};

export type TJobseekerWithUser = TJobseeker & {
  user: Omit<TUser, 'password'>;
};

export type TBusinessWithUser = TBusiness & {
  user: Omit<TUser, 'password'>;
};