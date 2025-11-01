import { ORDER_STATUS } from "@/constants/order-status";
import type { DonDatHang } from "@/types/order";
import type { CT_DonDatHang } from "@/types/orderDetail";
import { Calendar, ChevronRight, MapPin, Package } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface OrderItemProps {
  order: DonDatHang;
  onPress: (orderId: number) => void;
}

const getStatusBadgeClasses = (status?: string) => {
  switch (status) {
    case "DAXACNHAN":
      return {
        container: "bg-amber-100",
        text: "text-amber-800",
      };
    case "DANGGIAO":
      return {
        container: "bg-yellow-100",
        text: "text-yellow-800",
      };
    case "HOANTAT":
      return {
        container: "bg-green-200",
        text: "text-green-800",
      };
    case "DAHUY":
      return {
        container: "bg-red-100",
        text: "text-red-800",
      };
    case "TRAHANG":
      return {
        container: "bg-slate-100",
        text: "text-slate-800",
      };
    default:
      return {
        container: "bg-slate-100",
        text: "text-slate-800",
      };
  }
};

export const OrderItem = ({ order, onPress }: OrderItemProps) => {
  const itemCount = order.CT_DonDatHangs ? order.CT_DonDatHangs.length : 0;
  const total = order.CT_DonDatHangs
    ? order.CT_DonDatHangs.reduce(
        (sum: number, it: CT_DonDatHang) =>
          sum + Number(it.DonGia || 0) * (it.SoLuong || 0),
        0
      )
    : 0;

  const statusConfig = ORDER_STATUS[order.TrangThaiDH?.TrangThai!] || [
    "",
    "Chưa xác định",
    "bg-slate-100",
    "text-slate-800",
  ];

  const badgeClasses = getStatusBadgeClasses(order.TrangThaiDH?.TrangThai);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(order.MaDDH)}
      className="w-full"
      activeOpacity={0.7}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        {/* Header with Order ID and Status */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-yellow-100 rounded-full items-center justify-center mr-2">
              <Package size={16} color="#78350f" />
            </View>
            <Text className="text-sm font-bold text-slate-900">
              ĐƠN #{order.MaDDH}
            </Text>
          </View>

          <View className={`${badgeClasses.container} px-3 py-1 rounded-full`}>
            <Text className={`${badgeClasses.text} text-xs font-semibold`}>
              {statusConfig[1]}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          {/* Customer Name */}
          <View className="mb-3">
            <Text className="text-xs text-slate-500 mb-1">Người nhận</Text>
            <Text
              className="text-base font-semibold text-slate-900"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {order.NguoiNhan || "Chưa cập nhật"}
            </Text>
          </View>

          {/* Address */}
          <View className="flex-row items-start mb-3">
            <MapPin size={16} color="#64748b" className="mt-0.5 mr-2" />
            <Text
              className="flex-1 text-sm text-slate-600 leading-5"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {order.DiaChiGiao || "Chưa có địa chỉ"}
            </Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-slate-100 my-3" />

          {/* Footer Info */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              {/* Items Count */}
              <View className="flex-row items-center">
                <View className="w-6 h-6 bg-slate-100 rounded-full items-center justify-center mr-1.5">
                  <Package size={12} color="#64748b" />
                </View>
                <Text className="text-xs text-slate-600">{itemCount} SP</Text>
              </View>

              {/* Delivery Date */}
              {order.ThoiGianGiao && (
                <View className="flex-row items-center">
                  <View className="w-6 h-6 bg-slate-100 rounded-full items-center justify-center mr-1.5">
                    <Calendar size={12} color="#64748b" />
                  </View>
                  <Text className="text-xs text-slate-600">
                    {formatDate(order.ThoiGianGiao)}
                  </Text>
                </View>
              )}
            </View>

            {/* Total and Arrow */}
            <View className="flex-row items-center">
              <Text className="text-base font-bold text-yellow-900 mr-2">
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </Text>
              <ChevronRight size={18} color="#cbd5e1" />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
