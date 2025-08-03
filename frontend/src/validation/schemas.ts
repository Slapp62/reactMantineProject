import Joi from 'joi';

// Login validation schema
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required'
    })
});

// Business registration validation schema
export const businessRegistrationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
      'string.empty': 'Password is required'
    }),
  companyName: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Company name must be at least 2 characters long',
      'string.max': 'Company name cannot exceed 100 characters',
      'any.required': 'Company name is required',
      'string.empty': 'Company name is required'
    }),
  industry: Joi.string()
    .required()
    .messages({
      'any.required': 'Industry is required',
      'string.empty': 'Industry is required'
    }),
  city: Joi.string()
    .required()
    .messages({
      'any.required': 'City is required',
      'string.empty': 'City is required'
    }),
  description: Joi.string()
    .max(1000)
    .allow('', null)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 1000 characters'
    }),
  logo: Joi.string()
    .uri()
    .allow('', null)
    .optional()
    .messages({
      'string.uri': 'Logo must be a valid URL'
    }),
  website: Joi.string()
    .uri()
    .allow('', null)
    .optional()
    .messages({
      'string.uri': 'Website must be a valid URL'
    }),
  socialLinks: Joi.object({
    linkedin: Joi.string().uri().allow('', null).optional(),
    twitter: Joi.string().uri().allow('', null).optional(),
    facebook: Joi.string().uri().allow('', null).optional()
  }).optional()
});

// Job seeker registration validation schema
export const jobseekerRegistrationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
      'string.empty': 'Password is required'
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Password confirmation is required',
      'string.empty': 'Password confirmation is required'
    }),
  industry: Joi.string()
    .allow('', null)
    .optional(),
  region: Joi.string()
    .allow('', null)
    .optional(),
  city: Joi.string()
    .allow('', null)
    .optional(),
  linkedIn: Joi.string()
    .uri()
    .allow('', null)
    .optional()
    .messages({
      'string.uri': 'LinkedIn must be a valid URL'
    }),
  preferredWorkArr: Joi.string()
    .allow('', null)
    .optional(),
  description: Joi.string()
    .max(1000)
    .allow('', null)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 1000 characters'
    })
});

// Validation helper function
export const validateData = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, { 
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });
  
  if (error) {
    const errors: Record<string, string> = {};
    error.details.forEach((detail) => {
      const path = detail.path.join('.');
      if (!errors[path]) {
        errors[path] = detail.message;
      }
    });
    return { isValid: false, errors, data: value };
  }
  
  return { isValid: true, errors: {}, data: value };
};