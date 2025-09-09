"use server";

import * as z from "zod";
import {
  createProfileSchema,
  validateWithSchema,
  imageSchema,
  landmarkSchema,
} from "@/utils/schemas";
import { uploadFile } from "@/services/storage";
import { FormState } from "@/utils/types";
import { redirect } from "next/navigation";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import prisma from "@/utils/db";

const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.privateMetadata.hasProfile) redirect("/profile/create");

  return user;
};

const renderError = (error: unknown): FormState => {
  if (error instanceof z.ZodError) {
    const message = error.issues.map((issue) => issue.message).join(", ");
    return { message: message };
  }

  return { message: "Something went wrong" };
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
    const profile = validateWithSchema(createProfileSchema, data);

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
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found");
    }

    const data = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    const validatedFile = validateWithSchema(imageSchema, { image: file });
    const validatedData = validateWithSchema(landmarkSchema, data);

    // Upload image to storage
    const imagePath = await uploadFile(validatedFile.image);
    console.log(imagePath);

    // Insert into database
    await prisma.landmark.create({
      data: {
        ...validatedData,
        profileId: user.id,
        image: imagePath,
      },
    });

    // return { message: "Landmark created successfully" };
  } catch (error) {
    return renderError(error);
  }

  redirect("/");
};
