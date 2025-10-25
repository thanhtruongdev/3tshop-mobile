import { OrderItem } from "@/components/home/order-item";
import { TABS } from "@/constants/order-status";
import { OrderService } from "@/services/order.service";
import { DonDatHang } from "@/types/order";
import { getToken } from "@/utils/storage";
import { useRouter } from "expo-router";
import { Package2 } from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<string>("DANGGIAO");
  const router = useRouter();
  const [orders, setOrders] = useState<DonDatHang[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      try {
        const orders = await OrderService.getAssignedOrders();
        if (orders && Array.isArray(orders)) {
          setOrders(orders);
        }
      } catch (err) {
        console.error("Failed to fetch assigned orders:", err);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderPress = (orderId: number) => {
    router.push({
      pathname: "/order-detail",
      params: { orderId: String(orderId) },
    });
  };

  const filteredOrders = useMemo(() => {
    if (orders) {
      return orders.filter(
        (o) => (o.TrangThaiDH?.TrangThai || "") === activeTab
      );
    }
    return [];
  }, [activeTab, orders]);

  const renderOrderItem = (item: DonDatHang) => (
    <OrderItem order={item} onPress={handleOrderPress} />
  );

  return (
    <View className="flex-1 bg-slate-50">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-xl font-bold text-slate-900">
          Danh sách đơn giao hàng
        </Text>
        <Text className="text-sm text-slate-500 mt-1">Lọc theo trạng thái</Text>
      </View>

      {/* Tabs */}
      <View className="px-4">
        <View className="flex-row justify-between items-center">
          {TABS.map((t) => {
            const active = t.key === activeTab;
            return (
              <TouchableOpacity
                key={t.key}
                onPress={() => setActiveTab(t.key)}
                className={`px-3 py-2 rounded-full ${active ? "bg-yellow-900" : "bg-slate-100"}`}
              >
                <Text
                  className={`${active ? "text-white" : "text-slate-800"} text-md font-medium`}
                >
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => renderOrderItem(item)}
        keyExtractor={(item) => item.MaDDH.toString()}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
          paddingTop: 12,
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        ListEmptyComponent={() => (
          <View className="px-4 mt-8 items-center">
            <Package2 size={70} color={"#64748b"} />
            <Text className="text-sm text-slate-500">
              Không có đơn hàng cho trạng thái này
            </Text>
          </View>
        )}
      />
    </View>
  );
}
