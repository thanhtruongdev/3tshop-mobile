import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  return (
    <View className="bg-black flex-1">
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: "3TShop Delivery" }}
        />
      </Stack>
    </View>
  );
}
