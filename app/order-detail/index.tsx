import { BottomAction } from "@/components/order-detail/bottom-action";
import DetailHeader from "@/components/order-detail/detail-header";
import OrderDetailCard from "@/components/order-detail/order-detail-card";
import OrderSummary from "@/components/order-detail/order-summary";
import mockOrders from "@/utils/mock-data";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailScreen() {
  const { orderId } = useLocalSearchParams();
  const id = orderId ? Number(orderId) : NaN;
  const order = !isNaN(id) ? mockOrders.find((o) => o.MaDDH === id) : null;
  const router = useRouter();

  const handleOnCompleteOrder = () => {
    console.log("Complete order");
  };

  if (!order)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-sm text-slate-500">Đơn hàng không tồn tại</Text>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <DetailHeader onBack={() => router.back()} />
      <OrderSummary order={order} />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <OrderDetailCard order={order} />
      </ScrollView>
      {order.TrangThaiDH?.TrangThai === "DANGGIAO" && (
        <BottomAction onSubmit={handleOnCompleteOrder} />
      )}
    </SafeAreaView>
  );
}
