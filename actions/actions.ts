"use server";

import * as z from "zod";
import { createProfileSchema, createProfileValidator } from "@/utils/schemas";
import { FormState } from "@/utils/types";
import { redirect } from "next/navigation";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import prisma from "@/utils/db";

const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.privateMetadata.hasProfile) {
    redirect("/profile/create");
  }
  return user;
};

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
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }

    const data = Object.fromEntries(formData);
    const profile = createProfileValidator(createProfileSchema, data);

    await prisma.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...profile,
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/");
};

export const createLandmarkAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }

    const data = Object.fromEntries(formData);

    return { message: "Landmark created successfully" };
  } catch (error) {
    return renderError(error);
  }
};
