import { ORDER_STATUS } from "@/constants/order-status";
import type { DonDatHang } from "@/types/order";
import type { CT_DonDatHang } from "@/types/orderDetail";
import { statusColor } from "@/utils/status-colors";
import { ChevronRight, MapPin } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface OrderItemProps {
  order: DonDatHang;
  onPress: (orderId: number) => void;
}

export const OrderItem = ({ order, onPress }: OrderItemProps) => {
  const itemCount = order.CT_DonDatHangs ? order.CT_DonDatHangs.length : 0;
  const total = order.CT_DonDatHangs
    ? order.CT_DonDatHangs.reduce(
        (sum: number, it: CT_DonDatHang) =>
          sum + Number(it.DonGia || 0) * (it.SoLuong || 0),
        0
      )
    : 0;

  return (
    <TouchableOpacity
      onPress={() => onPress(order.MaDDH)}
      className="w-full"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center p-3 bg-white rounded-lg">
        <Image
          source={require("../../assets/images/package.jpg")}
          style={{ width: 40, height: 40 }}
          className="rounded-lg mr-3"
        />

        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <View className="pr-2">
              <Text className="text-sm text-slate-500">#{order.MaDDH}</Text>
              <Text
                className="text-base font-semibold text-slate-900"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {order.NguoiNhan}
              </Text>
            </View>
          </View>

          <Text
            className="text-md text-slate-500 mt-1"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            <MapPin size={12} color="#6b7280" /> {order.DiaChiGiao}
          </Text>

          <View className="flex-row items-center mt-2">
            <Text className="text-sm text-slate-500">{itemCount} mặt hàng</Text>
            {order.ThoiGianGiao ? (
              <Text className="text-sm text-slate-500 ml-1">
                • {new Date(order.ThoiGianGiao).toLocaleDateString()}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          className="ml-3 items-end"
          style={{
            flexDirection: "column",
            minHeight: 72,
            justifyContent: "space-between",
          }}
        >
          {/* status at top-right */}
          <View>
            <View
              className={`${statusColor(ORDER_STATUS[order.TrangThaiDH?.TrangThai!][0])} px-2 py-0.5 rounded-full`}
            >
              <Text className="text-sm font-medium">
                {ORDER_STATUS[order.TrangThaiDH?.TrangThai!][1] || "--"}
              </Text>
            </View>
          </View>

          {/* total at bottom-right */}
          <View style={{ marginTop: "auto", alignItems: "flex-end" }}>
            <ChevronRight size={20} color="#9ca3af" />
            <Text className="text-sm font-semibold text-slate-900 mt-2">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
