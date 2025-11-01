import { Notification } from "@/types/notification.type";
import { Bell, BellRing, ChevronRight, Package } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export const NotificationItem = ({
  notification,
  onPress,
}: NotificationItemProps) => {
  const isUnread = notification.trangThai === "unread";

  // Format thời gian
  const formatTime = (timestamp: { _seconds: number }) => {
    if (!timestamp?._seconds) return "";

    const date = new Date(timestamp._seconds * 1000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getIcon = () => {
    if (notification.loai === "SYSTEM_ALERT") {
      return isUnread ? (
        <BellRing size={24} color="#825B32" />
      ) : (
        <Bell size={24} color="#94a3b8" />
      );
    }
    return <Package size={24} color={isUnread ? "#825B32" : "#94a3b8"} />;
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(notification)}
      className="w-full"
      activeOpacity={0.7}
    >
      <View
        className={`flex-row items-start p-4 bg-white rounded-lg border ${
          isUnread ? "border-yellow-200 bg-yellow-50/30" : "border-slate-100"
        }`}
      >
        {/* Icon */}
        <View
          className={`w-12 h-12 rounded-full items-center justify-center mr-3 ${
            isUnread ? "bg-yellow-100" : "bg-slate-100"
          }`}
        >
          {getIcon()}
        </View>

        {/* Content */}
        <View className="flex-1 pr-2">
          <View className="flex-row items-start justify-between mb-1">
            <Text
              className={`text-base flex-1 ${
                isUnread
                  ? "font-semibold text-slate-900"
                  : "font-medium text-slate-600"
              }`}
              numberOfLines={2}
            >
              {notification.tieuDe}
            </Text>
            {isUnread && (
              <View className="w-2.5 h-2.5 rounded-full bg-yellow-600 ml-2 mt-1" />
            )}
          </View>

          <Text
            className={`text-sm ${isUnread ? "text-slate-700" : "text-slate-500"} mb-2`}
            numberOfLines={2}
          >
            {notification.noiDung}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-xs text-slate-400">
              {formatTime(notification.ngayGui)}
            </Text>

            {notification.duLieu?.orderId && (
              <View className="flex-row items-center">
                <Text className="text-xs text-yellow-700 font-medium">
                  Đơn #{notification.duLieu.orderId}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Arrow */}
        <ChevronRight size={20} color="#cbd5e1" className="mt-1" />
      </View>
    </TouchableOpacity>
  );
};
