import { EmptyNotification } from "@/components/notification/EmptyNotification";
import { NotificationHeader } from "@/components/notification/NotificationHeader";
import { NotificationItem } from "@/components/notification/NotificationItem";
import { COLORS } from "@/constants/colors";
import { useGetNotification } from "@/hooks/useGetNotification";
import { NotificationService } from "@/services/notification.service";
import { Notification } from "@/types/notification.type";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { Toast } from "toastify-react-native";

export default function NotificationScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [refreshing, setRefreshing] = useState(false);

  const { notifications, loading, error, maNhanVien, refetch } =
    useGetNotification();

  // Đếm số thông báo chưa đọc
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.trangThai === "unread").length;
  }, [notifications]);

  // Lọc thông báo theo filter
  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((n) => n.trangThai === "unread");
    }
    return notifications;
  }, [notifications, filter]);

  // Handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Gọi hàm refetch để reload dữ liệu từ Firebase
      if (refetch) {
        refetch();
      }
      // Delay một chút để UX tốt hơn
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      console.error("Error refreshing notifications:", err);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  // Xử lý khi nhấn vào thông báo
  const handleNotificationPress = async (notification: Notification) => {
    try {
      // Đánh dấu đã đọc
      if (notification.trangThai === "unread" && maNhanVien) {
        await NotificationService.markAsRead(maNhanVien, notification.id);
      }

      // Chuyển đến trang order-detail nếu có orderId
      if (notification.duLieu?.orderId) {
        router.push({
          pathname: "/order-detail",
          params: { orderId: notification.duLieu.orderId },
        });
      } else if (notification.duLieu?.screen) {
        router.push(notification.duLieu.screen as any);
      }
    } catch (err) {
      console.error("Error handling notification press:", err);
      Alert.alert("Lỗi", "Không thể xử lý thông báo này");
    }
  };

  // Đánh dấu tất cả đã đọc
  const handleMarkAllAsRead = async () => {
    if (!maNhanVien) return;

    try {
      const unreadNotifications = notifications.filter(
        (n) => n.trangThai === "unread"
      );

      // Đánh dấu tất cả song song
      await Promise.all(
        unreadNotifications.map((n) =>
          NotificationService.markAsRead(maNhanVien, n.id)
        )
      );

      Toast.success("Đã đánh dấu tất cả thông báo là đã đọc");
    } catch (err) {
      console.error("Error marking all as read:", err);
      Toast.error("Không thể đánh dấu tất cả thông báo");
    }
  };

  // Render notification item
  const renderItem = ({ item }: { item: Notification }) => (
    <NotificationItem notification={item} onPress={handleNotificationPress} />
  );

  // Loading state
  if (loading && !maNhanVien) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        <Text className="text-slate-600 mt-4">Đang tải thông báo...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center px-8">
        <Text className="text-lg font-semibold text-red-600 mb-2">
          Có lỗi xảy ra
        </Text>
        <Text className="text-sm text-slate-600 text-center">
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <NotificationHeader
        filter={filter}
        onFilterChange={setFilter}
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
        hasUnread={unreadCount > 0}
      />

      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.PRIMARY]}
            tintColor={COLORS.PRIMARY}
          />
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 24,
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyNotification hasUnread={filter === "all" && unreadCount > 0} />
        )}
      />
    </View>
  );
}
