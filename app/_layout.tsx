import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastProvider from "toastify-react-native";
import "../global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, statusBarStyle: "dark" }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="index" />
        </Stack>
        <ToastProvider useModal={false} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
