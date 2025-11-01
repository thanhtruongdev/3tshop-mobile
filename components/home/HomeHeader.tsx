import { getUserInfor } from "@/utils/storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface HomeHeaderProps {
  totalOrders: number;
  activeCount: number;
  completedToday: number;
}

export const HomeHeader = ({
  totalOrders,
  activeCount,
  completedToday,
}: HomeHeaderProps) => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const userInfo = await getUserInfor();
        if (userInfo?.TenNV) {
          setUserName(userInfo.TenNV);
        }
      } catch (err) {
        console.error("Error loading user name:", err);
      }
    };
    loadUserName();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  return (
    <View className="bg-white px-4 pt-6 border-b border-slate-100">
      {/* Greeting */}
      <View className="mb-4">
        <Text className="text-2xl font-bold text-slate-900">
          {getGreeting()}
          {userName ? `, ${userName}` : ""}
        </Text>
        <Text className="text-sm text-slate-500 mt-1">
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
};
