

export const zodValidator = (schema, data) => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    const messages = error.issues.map((iss) => iss.message);
    return { success: false, error: `Zod Error: ${messages[0]}` };
  }
};