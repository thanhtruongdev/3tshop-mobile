import { GrantPermission } from "@/components/common/grant-permission";
import { DeliveryImageModal } from "@/components/order-detail/delivery-image";
import DetailHeader from "@/components/order-detail/detail-header";
import OrderDetailCard from "@/components/order-detail/order-detail-card";
import OrderSummary from "@/components/order-detail/order-summary";
import { COLORS } from "@/constants/colors";
import { OrderService } from "@/services/order.service";
import { OrderDetailData } from "@/types/order-detail-response";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Camera, FileText, Image as ImageIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCameraPermission } from "react-native-vision-camera";

export default function OrderDetailScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();

  const { orderId } = useLocalSearchParams();
  const id = orderId ? Number(orderId) : NaN;
  const [order, setOrder] = useState<OrderDetailData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPermissionModal, setShowPermissionModal] =
    useState<boolean>(false);
  const [showImageModal, setShowImageModal] = useState<boolean>(false);
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
    (async () => {
      if (!hasPermission) {
        try {
          const granted = await requestPermission();
          const isGranted =
            typeof granted === "boolean" ? granted : hasPermission;
          if (!isGranted) {
            setShowPermissionModal(true);
            return;
          }
        } catch (e) {
          setShowPermissionModal(true);
          return;
        }
      }

      // permission is available
      router.navigate({
        pathname: "/camera",
        params: { orderId: id, isNavigateFromOrderDetail: "true" },
      });
    })();
  };

  const handleOnShowInvoice = () => {
    router.push({
      pathname: "/invoice",
      params: { invoiceId: String(order?.ThongTinHoaDon?.SoHD) },
    });
  };

  const handleOnShowDeliveryImage = () => {
    setShowImageModal(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <GrantPermission
        showPermissionModal={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
      />

      {/* Modal hiển thị ảnh giao hàng */}
      <DeliveryImageModal
        visible={showImageModal}
        imageUrl={order?.ThongTinDonHang?.HinhMinhChung}
        onClose={() => setShowImageModal(false)}
      />

      {isLoading && (
        <View className="flex-1 justify-center items-center gap-4 bg-white">
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text className="text-sm text-slate-600 mt-2">
            Đang tải thông tin đơn hàng...
          </Text>
        </View>
      )}

      {!order && !isLoading && (
        <View className="flex-1 items-center justify-center bg-white px-8">
          <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-4">
            <FileText size={40} color="#94a3b8" />
          </View>
          <Text className="text-lg font-semibold text-slate-900 mb-2">
            Không tìm thấy đơn hàng
          </Text>
          <Text className="text-sm text-slate-500 text-center">
            Đơn hàng này không tồn tại hoặc đã bị xóa
          </Text>
        </View>
      )}

      {order && (
        <View className="flex-1">
          <DetailHeader onBack={() => router.back()} />

          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
          >
            <OrderSummary order={order} />
            <OrderDetailCard order={order} />
          </ScrollView>
        </View>
      )}

      {/* Sticky bottom action bar */}
      {order && (
        <SafeAreaView
          edges={["bottom"]}
          className="absolute left-0 right-0 bottom-0 bg-white border-t border-slate-200"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <View className="px-4 py-3">
            <View
              className={`flex-row gap-3 ${
                order.ThongTinDonHang?.TrangThai?.Ten === "DANGGIAO"
                  ? "justify-between"
                  : "justify-center"
              }`}
            >
              {order.ThongTinDonHang?.TrangThai?.Ten === "DANGGIAO" && (
                <TouchableOpacity
                  onPress={handleOnCompleteOrder}
                  className="flex-1 bg-yellow-900 rounded-full py-3.5 flex-row items-center justify-center"
                  activeOpacity={0.8}
                  style={{
                    shadowColor: "#78350f",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                >
                  <Camera size={20} color="#ffffff" />
                  <Text className="text-white font-bold text-base ml-2">
                    Hoàn tất đơn
                  </Text>
                </TouchableOpacity>
              )}

              {order.ThongTinDonHang?.HinhMinhChung && (
                <TouchableOpacity
                  onPress={handleOnShowDeliveryImage}
                  className="flex-1 bg-yellow-900 rounded-full py-3.5 flex-row items-center justify-center"
                  activeOpacity={0.8}
                  style={{
                    shadowColor: "#78350f",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                >
                  <ImageIcon size={20} color="#ffffff" />
                  <Text className="text-white font-bold text-base ml-2">
                    Ảnh giao hàng
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleOnShowInvoice}
                className={`${
                  order.ThongTinDonHang?.TrangThai?.Ten === "DANGGIAO"
                    ? "flex-1"
                    : "flex-1"
                } border-2 border-yellow-900 rounded-full py-3.5 flex-row items-center justify-center`}
                activeOpacity={0.8}
              >
                <FileText size={20} color="#78350f" />
                <Text className="text-yellow-900 font-bold text-base ml-2">
                  Xem hóa đơn
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}
