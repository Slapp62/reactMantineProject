import Joi from 'joi';

// Validation middleware factory
export const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        error: 'Validation failed',
        details: errorDetails
      });
    }
    
    next();
  };
};

// User registration schemas
export const businessRegistrationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),
  userType: Joi.string()
    .valid('business')
    .required(),
  companyName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Company name must be at least 2 characters long',
      'string.max': 'Company name cannot exceed 100 characters',
      'any.required': 'Company name is required'
    }),
  industry: Joi.string()
    .required()
    .messages({
      'any.required': 'Industry is required'
    }),
  city: Joi.string()
    .required()
    .messages({
      'any.required': 'City is required'
    }),
  description: Joi.string()
    .max(1000)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 1000 characters'
    }),
  logo: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Logo must be a valid URL'
    }),
  website: Joi.string()
    .uri()
    .optional()
    .messages({
      'string.uri': 'Website must be a valid URL'
    }),
  socialLinks: Joi.object({
    linkedin: Joi.string().uri().optional(),
    twitter: Joi.string().uri().optional(),
    facebook: Joi.string().uri().optional()
  }).optional()
});

export const jobseekerRegistrationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),
  userType: Joi.string()
    .valid('jobseeker')
    .required(),
  industry: Joi.string().optional(),
  region: Joi.string().optional(),
  city: Joi.string().optional(),
  linkedIn: Joi.string().uri().optional(),
  preferredWorkArr: Joi.string().optional(),
  description: Joi.string().max(1000).optional()
});

// Login schema
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

// Job listing schemas
export const createListingSchema = Joi.object({
  jobTitle: Joi.string()
    .min(2)
    .max(200)
    .required()
    .messages({
      'string.min': 'Job title must be at least 2 characters long',
      'string.max': 'Job title cannot exceed 200 characters',
      'any.required': 'Job title is required'
    }),
  jobDescription: Joi.string()
    .min(10)
    .max(5000)
    .required()
    .messages({
      'string.min': 'Job description must be at least 10 characters long',
      'string.max': 'Job description cannot exceed 5000 characters',
      'any.required': 'Job description is required'
    }),
  requirements: Joi.array()
    .items(Joi.string().max(500))
    .max(20)
    .optional()
    .messages({
      'array.max': 'Cannot have more than 20 requirements'
    }),
  advantages: Joi.array()
    .items(Joi.string().max(500))
    .max(20)
    .optional()
    .messages({
      'array.max': 'Cannot have more than 20 advantages'
    }),
  apply: Joi.object({
    method: Joi.string().valid('email', 'link').required(),
    contact: Joi.string().required()
  }).required(),
  location: Joi.object({
    region: Joi.string().optional(),
    city: Joi.string().optional()
  }).optional(),
  workArrangement: Joi.string().required(),
  industry: Joi.string().optional(),
  expiresAt: Joi.date().greater('now').optional()
});

// Update listing schema (same as create but all fields optional except businessId verification)
export const updateListingSchema = Joi.object({
  jobTitle: Joi.string().min(2).max(200).optional(),
  jobDescription: Joi.string().min(10).max(5000).optional(),
  requirements: Joi.array().items(Joi.string().max(500)).max(20).optional(),
  advantages: Joi.array().items(Joi.string().max(500)).max(20).optional(),
  apply: Joi.object({
    method: Joi.string().valid('email', 'link').required(),
    contact: Joi.string().required()
  }).optional(),
  location: Joi.object({
    region: Joi.string().optional(),
    city: Joi.string().optional()
  }).optional(),
  workArrangement: Joi.string().optional(),
  industry: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
  expiresAt: Joi.date().greater('now').optional()
});

// Sanitization helpers
export const sanitizeHtml = (text) => {
  if (typeof text !== 'string') return text;
  
  // Basic HTML sanitization - remove script tags and dangerous attributes
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Apply sanitization to request body
export const sanitizeInput = (req, res, next) => {
  const sanitizeObject = (obj) => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
          obj[key] = sanitizeHtml(obj[key]);
        } else if (typeof obj[key] === 'object') {
          sanitizeObject(obj[key]);
        }
      });
    }
  };
  
  if (req.body) {
    sanitizeObject(req.body);
  }
  
  next();
};