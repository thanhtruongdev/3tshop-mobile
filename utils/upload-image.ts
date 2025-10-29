import { CLOUDINARY_CONFIG } from "@/lib/cloudinary";

export const uploadImageToCloudinary = async (fileUri: string) => {
  try {
    if (!fileUri) return null;

    // infer filename and mime type
    const uri = fileUri;
    const filename = uri.split("/").pop() || "photo.jpg";
    const match = /\.([a-zA-Z0-9]+)$/.exec(filename);
    let type = "image/jpeg";
    if (match) {
      const ext = match[1].toLowerCase();
      if (ext === "jpg" || ext === "jpeg") type = "image/jpeg";
      else if (ext === "png") type = "image/png";
      else if (ext === "webp") type = "image/webp";
      else type = `image/${ext}`;
    }

    const formData = new FormData();
    // @ts-ignore - FormData file item typing differs across environments
    formData.append("file", { uri, name: filename, type });
    formData.append("upload_preset", CLOUDINARY_CONFIG.UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_CONFIG.API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data && data.secure_url) {
      return data.secure_url as string;
    }

    console.error("Cloudinary upload failed:", data);
    return null;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};