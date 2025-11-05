import { EmptyOrders } from "@/components/home/EmptyOrders";
import { HomeHeader } from "@/components/home/HomeHeader";
import { OrderItem } from "@/components/home/order-item";
import { OrderFilter } from "@/components/home/OrderFilter";
import { SearchBar } from "@/components/home/SearchBar";
import { COLORS } from "@/constants/colors";
import { OrderService } from "@/services/order.service";
import { DonDatHang } from "@/types/order";
import { searchOrders, SortOption, sortOrders } from "@/utils/sorter";
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
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

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
    console.log("🔄 Filtering orders:", {
      totalOrders: orders?.length || 0,
      activeTab,
      searchText,
      sortBy,
    });

    if (orders) {
      // 1. Lọc theo trạng thái
      let filtered = orders.filter(
        (o) => (o.TrangThaiDH?.TrangThai || "") === activeTab
      );
      console.log(
        `📋 After status filter (${activeTab}): ${filtered.length} orders`
      );

      // Log sample order data
      if (filtered.length > 0) {
        console.log("📦 Sample order:", {
          MaDDH: filtered[0].MaDDH,
          NguoiNhan: filtered[0].NguoiNhan,
          SDT: filtered[0].SDT,
          KhachHang: filtered[0].KhachHang?.TenKH,
        });
      }

      // 2. Tìm kiếm (search)
      if (searchText && searchText.trim() !== "") {
        console.log("🔍 Applying search filter...");
        filtered = searchOrders(filtered, searchText);
        console.log(`🔍 After search filter: ${filtered.length} orders`);
      }

      // 3. Sắp xếp (sort)
      filtered = sortOrders(filtered, sortBy);
      console.log(`✅ Final filtered orders: ${filtered.length}`);

      return filtered;
    }
    return [];
  }, [activeTab, orders, searchText, sortBy]);

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

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        sortBy={sortBy}
        onSortChange={setSortBy}
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
