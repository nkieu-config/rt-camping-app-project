import * as z from "zod";

export const createProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  userName: z
    .string()
    .min(4, { message: "UserName must be at least 4 characters" }),
});

export const createProfileValidator = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((error) => error.message);
    throw new Error(errors.join("\n"));
  }

  return result.data;
};
