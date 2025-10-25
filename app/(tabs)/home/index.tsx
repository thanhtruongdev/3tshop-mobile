import { OrderItem } from "@/components/home/order-item";
import { TABS } from "@/constants/order-status";
import { DonDatHang } from "@/types/order";
import mockOrders from "@/utils/mock-data";
import { useRouter } from "expo-router";
import { Package2 } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type Section = {
  title: string;
  data: DonDatHang[];
};

const statusPriority = ["DANGGIAO"]; // prioritize this status first

function groupByStatus(items: DonDatHang[]): Section[] {
  const map = new Map<string, DonDatHang[]>();
  items.forEach((it) => {
    const key = it.TrangThaiDH?.TrangThai || "CHUA_TRANGTHAI";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(it);
  });

  const sections: Section[] = [];

  // add priority statuses first
  statusPriority.forEach((s) => {
    const group = map.get(s);
    if (group) {
      sections.push({ title: s, data: group });
      map.delete(s);
    }
  });

  // add remaining statuses sorted by name
  const remaining = Array.from(map.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  remaining.forEach(([k, v]) => sections.push({ title: k, data: v }));

  return sections;
}

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<string>("DANGGIAO");

  const router = useRouter();

  const handleOrderPress = (orderId: number) => {
    router.push({
      pathname: "/order-detail",
      params: { orderId: String(orderId) },
    });
  };

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(
      (o) => (o.TrangThaiDH?.TrangThai || "") === activeTab
    );
  }, [activeTab]);

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
        <View className="flex-row space-x-3">
          {TABS.map((t) => {
            const active = t.key === activeTab;
            return (
              <TouchableOpacity
                key={t.key}
                onPress={() => setActiveTab(t.key)}
                className={`px-3 py-1 rounded-full mr-4 ${active ? "bg-yellow-900" : "bg-slate-100"}`}
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
