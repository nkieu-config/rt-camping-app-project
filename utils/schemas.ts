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

const validateImage = () => {
  const maxFileSize = 5 * 1024 * 1024;
  return z.instanceof(File).refine(
    (file) => {
      return file.size <= maxFileSize;
    },
    {
      message: "File size must be less than 5MB",
    },
  );
};

export const imageSchema = z.object({
  image: validateImage(),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(30, {
      message: "Name must be at most 30 characters",
    }),
  category: z.string(),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" })
    .max(200, { message: "Description must be at most 200 characters" }),
  price: z.coerce
    .number()
    .int()
    .min(0, { message: "Price must be at least 0 baht" }),
  province: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

export const validateWithSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw result.error;
  }

  return result.data;
};
