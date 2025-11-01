import { DEVICE_ID_KEY } from "@/constants/storage";
import EncryptedStorage from "react-native-encrypted-storage";
import uuid from "react-native-uuid";

export async function getOrCreateDeviceId() {
  let id = await EncryptedStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    try {
      id = uuid.v4();
      await EncryptedStorage.setItem(DEVICE_ID_KEY, id);
    } catch (error) {
      console.error("Error creating device ID:", error);
    }
  }
  return id;
}
