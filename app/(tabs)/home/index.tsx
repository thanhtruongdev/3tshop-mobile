import { EmptyOrders } from "@/components/home/EmptyOrders";
import { HomeHeader } from "@/components/home/HomeHeader";
import { OrderFilter } from "@/components/home/OrderFilter";
import { OrderItem } from "@/components/home/order-item";
import { COLORS } from "@/constants/colors";
import { OrderService } from "@/services/order.service";
import { DonDatHang } from "@/types/order";
import { getToken } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<string>("DANGGIAO");
  const router = useRouter();
  const [orders, setOrders] = useState<DonDatHang[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = await getToken();
    if (!token) {
      return;
    }
    setLoading(true);
    try {
      const orders = await OrderService.getAssignedOrders();
      if (orders && Array.isArray(orders)) {
        setOrders(orders);
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch assigned orders:", err);
      setOrders([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = useCallback(async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await fetchOrders();
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  const handleOrderPress = (orderId: number) => {
    router.push({
      pathname: "/order-detail",
      params: { orderId: String(orderId) },
    });
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = orders.length;
    const active = orders.filter(
      (o) => o.TrangThaiDH?.TrangThai === "DANGGIAO"
    ).length;
    const today = new Date();
    const completedToday = orders.filter((o) => {
      if (o.TrangThaiDH?.TrangThai !== "HOANTAT") return false;
      const orderDate = o.ThoiGianGiao ? new Date(o.ThoiGianGiao) : null;
      return orderDate && orderDate.toDateString() === today.toDateString();
    }).length;

    return { total, active, completedToday };
  }, [orders]);

  // Count orders by status
  const orderCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((order) => {
      const status = order.TrangThaiDH?.TrangThai || "";
      counts[status] = (counts[status] || 0) + 1;
    });
    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (orders) {
      return orders.filter(
        (o) => (o.TrangThaiDH?.TrangThai || "") === activeTab
      );
    }
    return [];
  }, [activeTab, orders]);

  const renderOrderItem = ({ item }: { item: DonDatHang }) => (
    <OrderItem order={item} onPress={handleOrderPress} />
  );

  if (loading && !refreshing) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center">
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <HomeHeader
        totalOrders={stats.total}
        activeCount={stats.active}
        completedToday={stats.completedToday}
      />

      <OrderFilter
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={orderCounts}
      />

      <FlatList
        data={filteredOrders}
        scrollEnabled={true}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.MaDDH.toString()}
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
          paddingBottom: 24,
          paddingTop: 16,
          flexGrow: 1,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <EmptyOrders status={activeTab} isFiltered={true} />
        )}
      />
    </View>
  );
}
