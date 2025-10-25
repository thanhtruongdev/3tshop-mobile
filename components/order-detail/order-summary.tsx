import { ORDER_STATUS } from "@/constants/order-status";
import { OrderDetailData } from "@/types/order-detail-response";
import * as Clipboard from "expo-clipboard";
import { Copy, MapPin, Phone } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Toast } from "toastify-react-native";

interface Props {
  order: OrderDetailData;
}

export const OrderSummary: React.FC<Props> = ({ order }) => {
  const handleOnCopyPhone = async (phone: string) => {
    if (phone) {
      try {
        await Clipboard.setStringAsync(phone).then(() => {
          Toast.success("Số điện thoại đã được sao chép");
        });
      } catch (e) {
        Toast.error("Lỗi sao chép số điện thoại");
      }
    }
  };

  return (
    <View className="px-4 pt-4 pb-3 bg-white">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text className="text-sm text-slate-500">Người nhận</Text>
          <Text className="text-base font-semibold text-slate-900">
            {order.ThongTinNguoiNhan?.HoTen}
          </Text>

          <View className="flex-row items-center mt-4 gap-2">
            <Phone size={16} color="#6b7280" />
            <Text className="text-md text-slate-500">
              {order.ThongTinNguoiNhan?.SDT}
            </Text>
            <TouchableOpacity
              onPress={() => handleOnCopyPhone(order.ThongTinNguoiNhan?.SDT!)}
              hitSlop={12}
            >
              <Copy size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-start mt-4">
            <MapPin size={16} color="#6b7280" />
            <Text className="text-md text-slate-500 ml-2" numberOfLines={2}>
              {order.ThongTinNguoiNhan?.DiaChi}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-sm text-slate-500">Mã đơn</Text>
          <Text className="text-md font-medium text-slate-800">
            #{order.ThongTinDonHang?.MaDDH}
          </Text>
          {order.ThongTinDonHang?.TrangThai ? (
            <View
              className={`${ORDER_STATUS[order.ThongTinDonHang?.TrangThai?.Ten][2]} px-2 py-0.5 rounded-full`}
            >
              <Text className="text-md font-medium text-amber-800">
                {ORDER_STATUS[order.ThongTinDonHang?.TrangThai?.Ten][1]}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;
