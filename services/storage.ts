import { supabase } from "@/lib/supabase";

const bucket = "landmark-bucket";

export async function uploadFile(image: File) {
  const timestamp = Date.now();
  const imageName = `${timestamp}-${image.name}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(imageName, image);

  if (!data) {
    throw new Error("Error uploading file");
  }

  // Serving assets from storage
  return supabase.storage.from(bucket).getPublicUrl(imageName).data.publicUrl;
}
