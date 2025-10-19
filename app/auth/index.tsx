import BackgroundWrapper from "@/components/wrappers/background";
import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <BackgroundWrapper>
      <View className="flex-1 items-center justify-center bg-blue-500">
        <Text className="text-amber-300 text-center text-3xl">
          Login Screen
        </Text>
      </View>
    </BackgroundWrapper>
  );
}
