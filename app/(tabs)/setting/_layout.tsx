import { Stack } from "expo-router";
import { View } from "react-native";

export default function SettingLayout() {
  return (
    <View className="bg-black flex-1">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
