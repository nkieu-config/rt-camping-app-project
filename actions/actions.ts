"use server";

import * as z from "zod";
import { createProfileSchema, createProfileValidator } from "@/utils/schemas";
import { FormState } from "@/utils/types";

const renderError = (error: unknown): FormState => {
  return {
    message:
      error instanceof z.ZodError ? error.message : "Something went wrong",
  };
};

export const createProfileAction = async (
  prevState: FormState,
  formData: FormData,
) => {
  try {
    const data = Object.fromEntries(formData);
    createProfileValidator(createProfileSchema, data);

    return { message: "Profile created successfully" };
  } catch (error) {
    return renderError(error);
  }
};
