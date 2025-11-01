import { COLORS } from "@/constants/colors";
import { Check, Filter } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface NotificationHeaderProps {
  filter: "all" | "unread";
  onFilterChange: (filter: "all" | "unread") => void;
  unreadCount: number;
  onMarkAllAsRead: () => void;
  hasUnread: boolean;
}

export const NotificationHeader = ({
  filter,
  onFilterChange,
  unreadCount,
  onMarkAllAsRead,
  hasUnread,
}: NotificationHeaderProps) => {
  return (
    <View className="bg-white border-b border-slate-100">
      <View className="px-4 pt-4 pb-3">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-2xl font-bold text-slate-900">Thông báo</Text>
            {unreadCount > 0 && (
              <Text className="text-sm text-slate-500 mt-1">
                {unreadCount} thông báo chưa đọc
              </Text>
            )}
          </View>

          {hasUnread && (
            <TouchableOpacity
              onPress={onMarkAllAsRead}
              className="flex-row items-center bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200"
              activeOpacity={0.7}
            >
              <Check size={16} color={COLORS.PRIMARY} />
              <Text className="text-sm font-medium text-yellow-900 ml-1">
                Đọc tất cả
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => onFilterChange("all")}
            className={`flex-1 flex-row items-center justify-center py-2.5 rounded-lg ${
              filter === "all" ? "bg-yellow-900" : "bg-slate-100"
            }`}
            activeOpacity={0.7}
          >
            <Filter
              size={16}
              color={filter === "all" ? "#ffffff" : "#64748b"}
            />
            <Text
              className={`ml-2 text-sm font-medium ${
                filter === "all" ? "text-white" : "text-slate-700"
              }`}
            >
              Tất cả
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onFilterChange("unread")}
            className={`flex-1 flex-row items-center justify-center py-2.5 rounded-lg ${
              filter === "unread" ? "bg-yellow-900" : "bg-slate-100"
            }`}
            activeOpacity={0.7}
          >
            <View className="relative">
              <Filter
                size={16}
                color={filter === "unread" ? "#ffffff" : "#64748b"}
              />
              {unreadCount > 0 && (
                <View className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-500 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Text>
                </View>
              )}
            </View>
            <Text
              className={`ml-2 text-sm font-medium ${
                filter === "unread" ? "text-white" : "text-slate-700"
              }`}
            >
              Chưa đọc
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
