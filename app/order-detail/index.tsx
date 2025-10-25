import { Button } from "@/components/common/button";
import DetailHeader from "@/components/order-detail/detail-header";
import OrderDetailCard from "@/components/order-detail/order-detail-card";
import OrderSummary from "@/components/order-detail/order-summary";
import { COLORS } from "@/constants/colors";
import { OrderService } from "@/services/order.service";
import { OrderDetailData } from "@/types/order-detail-response";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailScreen() {
  const { orderId } = useLocalSearchParams();
  const id = orderId ? Number(orderId) : NaN;
  const [order, setOrder] = useState<OrderDetailData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isNaN(id)) return;
    const fetchOrderDetail = async () => {
      setIsLoading(true);
      const orderDetail = await OrderService.getOrderAssignedDetails(id);
      if (orderDetail) {
        setOrder(orderDetail);
      }
      setIsLoading(false);
    };
    fetchOrderDetail();
  }, [orderId]);

  const handleOnCompleteOrder = () => {
    console.log("Complete order");
  };
  const handleOnShowInvoice = () => {
    router.push({
      pathname: "/invoice",
      params: { invoiceId: String(order?.ThongTinHoaDon?.SoHD) },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {isLoading && (
        <View className="flex-1 justify-center items-center gap-4">
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text className="text-sm text-slate-500 mt-2">
            Đang tải thông tin đơn hàng...
          </Text>
        </View>
      )}
      {!order && !isLoading && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-sm text-slate-500">Đơn hàng không tồn tại</Text>
        </View>
      )}
      {order && (
        <View>
          <DetailHeader onBack={() => router.back()} />
          <OrderSummary order={order} />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 24,
            }}
            style={{
              display: "flex",
              flexGrow: 1,
            }}
          >
            <OrderDetailCard order={order} />
          </ScrollView>
        </View>
      )}

      {/* Sticky bottom action bar (pins to screen bottom and respects safe area) */}
      {order && (
        <SafeAreaView
          edges={["bottom"]}
          className="absolute left-0 right-0 bottom-0 bg-white px-4 py-4 z-50 border-t border-slate-100"
        >
          <View
            className={`flex-row ${order.ThongTinDonHang?.TrangThai?.Ten === "DANGGIAO" ? "justify-between" : "justify-center"}`}
          >
            {order.ThongTinDonHang?.TrangThai?.Ten === "DANGGIAO" && (
              <>
                <Button
                  text="Hoàn tất đơn hàng"
                  onSubmit={handleOnCompleteOrder}
                  className="px-4 rounded-full w-1/2"
                />
                <View className="w-2" />
              </>
            )}
            <Button
              text="Xem hóa đơn"
              onSubmit={handleOnShowInvoice}
              className={`px-4 rounded-full ${order.ThongTinDonHang?.TrangThai?.Ten === "DANGGIAO" ? "w-1/2" : "w-full"}`}
            />
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
