import { useGetNotification } from "@/hooks/useGetNotification";
import { Bell } from "lucide-react-native";
import { useMemo } from "react";
import { Text, View } from "react-native";

interface NotificationIconProps {
  color: string;
  size?: number;
}

export const NotificationIcon = ({
  color,
  size = 28,
}: NotificationIconProps) => {
  const { notifications } = useGetNotification();

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.trangThai === "unread").length;
  }, [notifications]);

  return (
    <View>
      <Bell size={size} color={color} />
      {unreadCount > 0 && (
        <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 items-center justify-center px-1">
          <Text className="text-white text-[10px] font-bold">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Text>
        </View>
      )}
    </View>
  );
};
