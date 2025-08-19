import * as z from "zod";

const authSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });

export const zodListingValidator = (auth) => {
  try {
    const validatedAuth = authSchema.parse(auth);
    return { success: true, data: validatedAuth };
  } catch (error) {
    const messages = error.issues.map((iss) => iss.message);
    return { success: false, error: `Zod Error: ${messages[0]}` };
  }
};
