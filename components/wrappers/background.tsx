import { View } from "react-native";

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1 bg-gray-100 dark:bg-gray-900" style={{ flex: 1 }}>
      {children}
    </View>
  );
}
