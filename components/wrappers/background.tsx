import { View } from "react-native";

export default function BackgroundWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`flex-1 bg-white ${className}`} style={{ flex: 1 }}>
      {children}
    </View>
  );
}
