import { getUserInfor } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";

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
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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

    // Animation cho icon
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const getGreetingIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return {
        name: "sunny" as const,
        color: "#F59E0B",
        gradientColors: ["#FEF3C7", "#FDE68A", "#FCD34D"] as const,
        backgroundColor: "#FFFBEB",
      }; // Buổi sáng
    }
    if (hour < 18) {
      return {
        name: "partly-sunny" as const,
        color: "#F97316",
        gradientColors: ["#FFEDD5", "#FED7AA", "#FDBA74"] as const,
        backgroundColor: "#FFF7ED",
      }; // Buổi chiều
    }
    return {
      name: "moon" as const,
      color: "#6366F1",
      gradientColors: ["#E0E7FF", "#C7D2FE", "#A5B4FC"] as const,
      backgroundColor: "#EEF2FF",
    }; // Buổi tối
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="bg-white px-4 pt-6 pb-4 border-b border-slate-100">
      {/* Greeting */}
      <View className="mb-4">
        <View className="flex-row items-center gap-3">
          {/* Animated Icon with Gradient Background */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }, { rotate }],
            }}
          >
            <LinearGradient
              colors={getGreetingIcon().gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: getGreetingIcon().color,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
            >
              <Ionicons
                name={getGreetingIcon().name}
                size={28}
                color={getGreetingIcon().color}
              />
            </LinearGradient>
          </Animated.View>

          {/* Greeting Text */}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-slate-900">
              {getGreeting()}
            </Text>
            {userName && (
              <Text className="text-lg font-semibold text-slate-700 mt-0.5">
                {userName}
              </Text>
            )}
          </View>
        </View>

        {/* Date with enhanced styling */}
        <View className="mt-3 flex-row items-center">
          <View className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-2" />
          <Text className="text-sm font-medium text-slate-600">
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};
