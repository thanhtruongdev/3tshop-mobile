import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { NotificationIcon } from "@/components/notification/NotificationIcon";
import { COLORS } from "@/constants/colors";
import { Box, ScanLine, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60,
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
        name="scan"
        options={{
          title: "Quét QR",
          tabBarIcon: ({ color }) => <ScanLine size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Thông báo",
          tabBarIcon: ({ color }) => (
            <NotificationIcon color={color} size={28} />
          ),
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
