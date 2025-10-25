import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { COLORS } from "@/constants/colors";
import { Box, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 56,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Đơn hàng",
          tabBarIcon: ({ color }) => <Box size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Hồ sơ",
          tabBarIcon: ({ color }) => <User size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
