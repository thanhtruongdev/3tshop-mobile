import { Stack } from "expo-router";
import { Image, View } from "react-native";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <View className="flex-1 justify-center items-center">
            <Image
              source={require("../../../assets/logo/logo.png")}
              style={{
                width: 40,
                height: 40,
              }}
              resizeMode="contain"
            />
          </View>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
