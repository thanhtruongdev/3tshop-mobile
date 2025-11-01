import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useGetNotification } from "@/hooks/useGetNotification";
import useNotification from "@/hooks/useNotification";
import {
  equalTo,
  getDatabase,
  onValue,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { useEffect } from "react";
import { useCameraPermission } from "react-native-vision-camera";
import "../global.css";

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  useNotification();

  const { notifications, loading, error } = useGetNotification();

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = query(
      ref(db, "notifications"),
      orderByKey(),
      equalTo("21")
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.debug("Notifications data (onValue): ", data);
    });
  }, []);

  // Log when notifications state updates
  useEffect(() => {
    if (loading) {
      console.log("Loading notifications...");
    } else if (error) {
      console.error("Error loading notifications:", error.message);
    } else {
      console.log("Notifications data (updated):", notifications);
    }
  }, [notifications, loading, error]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useAuthNavigation();
}
