import { Bell, Inbox } from "lucide-react-native";
import { Text, View } from "react-native";

interface EmptyNotificationProps {
  hasUnread?: boolean;
}

export const EmptyNotification = ({
  hasUnread = false,
}: EmptyNotificationProps) => {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <View className="w-24 h-24 rounded-full bg-slate-100 items-center justify-center mb-4">
        {hasUnread ? (
          <Bell size={48} color="#94a3b8" />
        ) : (
          <Inbox size={48} color="#94a3b8" />
        )}
      </View>

      <Text className="text-lg font-semibold text-slate-900 mb-2 text-center">
        {hasUnread ? "Không có thông báo mới" : "Không có thông báo"}
      </Text>

      <Text className="text-sm text-slate-500 text-center">
        {hasUnread
          ? "Bạn đã xem hết tất cả thông báo"
          : "Chưa có thông báo nào được gửi đến bạn"}
      </Text>
    </View>
  );
};
