import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { useEffect } from "react";
import { useCameraPermission } from "react-native-vision-camera";
import "../global.css";

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);
  useAuthNavigation();
}
