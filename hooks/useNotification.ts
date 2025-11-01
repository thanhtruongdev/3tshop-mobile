import { NotificationService } from "@/services/notification.service";
import { getOrCreateDeviceId } from "@/utils/notification";
import { getUserInfor } from "@/utils/storage";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

export default function useNotification() {
  // Ensure Firebase app is initialized
  useEffect(() => {
    const handleSendToken = async (token: string) => {
      try {
        const deviceId = await getOrCreateDeviceId();
        const maNhanVien = (await getUserInfor())?.MaNV || ("" as string);
        if (token && deviceId && maNhanVien) {
          console.log("FCM Token:", token);
          await NotificationService.register({
            maNhanVien: maNhanVien,
            maThietBi: deviceId,
            nhaCungCap: "fcm",
            nenTang: Platform.OS,
            token: token,
          });
        }
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };
    const registerToken = async () => {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      handleSendToken(token);
    };

    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            await registerToken();
          }
        } else {
          const authStatus = await messaging().requestPermission();
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          if (enabled) {
            await registerToken();
          }
        }
      } catch (err) {
        console.error("Notification permission error:", err);
      }
    };

    // subscribe to token refresh
    const unsubscribe = messaging().onTokenRefresh(async (newToken) => {
      handleSendToken(newToken);
    });

    requestNotificationPermission();

    return () => {
      try {
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      } catch (e) {
        console.error("Error during cleanup:", e);
      }
    };
  }, []);
}
