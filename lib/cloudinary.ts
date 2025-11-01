import { CLOUD_NAME, UPLOAD_PRESET } from "@/constants/apis";

export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: CLOUD_NAME, 
  UPLOAD_PRESET: UPLOAD_PRESET, 
  get API_URL() {
    return `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`;
  }
};