import * as z from 'zod';

const loginSchema = z.object({
  email: z
    .email('Please enter a valid email')
    .min(1, "Email is required")
    ,

  password: z
    .string()
    .min(1, "Password is required")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/, 'Password must be a minimum 8 characters and contain at least one uppercase letter, number, and special character'),

  rememberMe: z.boolean(),
});

export { loginSchema };
