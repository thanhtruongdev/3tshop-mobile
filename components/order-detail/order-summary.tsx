import { ORDER_STATUS } from "@/constants/order-status";
import { OrderDetailData } from "@/types/order-detail-response";
import * as Clipboard from "expo-clipboard";
import {
  Calendar,
  Copy,
  MapPin,
  Package,
  Phone,
  User,
} from "lucide-react-native";
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

  const statusConfig = order.ThongTinDonHang?.TrangThai
    ? ORDER_STATUS[order.ThongTinDonHang.TrangThai.Ten]
    : ["", "Chưa xác định", "bg-slate-100", "text-slate-800"];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View className="bg-white">
      {/* Order ID and Status Banner */}
      <View className="px-4 py-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-100">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-yellow-900 rounded-full items-center justify-center mr-3">
              <Package size={20} color="#ffffff" />
            </View>
            <View>
              <Text className="text-xs text-slate-500 mb-1">Mã đơn hàng</Text>
              <Text className="text-lg font-bold text-slate-900">
                #{order.ThongTinDonHang?.MaDDH}
              </Text>
            </View>
          </View>

          <View className={`${statusConfig[2]} px-4 py-2 rounded-full`}>
            <Text className={`${statusConfig[3]} text-sm font-bold`}>
              {statusConfig[1]}
            </Text>
          </View>
        </View>

        {/* Delivery Date */}
        {order.ThongTinNguoiNhan?.ThoiGianGiao && (
          <View className="flex-row items-center mt-3 bg-white/60 px-3 py-2 rounded-lg">
            <Calendar size={16} color="#78350f" />
            <Text className="text-sm text-slate-700 ml-2 font-medium">
              Giao hàng: {formatDate(order.ThongTinNguoiNhan.ThoiGianGiao)}
            </Text>
          </View>
        )}
      </View>

      {/* Customer Info Card */}
      <View className="px-4 py-4">
        <View className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
          {/* Recipient Name */}
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <User size={18} color="#1e40af" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-slate-500 mb-1">Người nhận</Text>
              <Text className="text-base font-semibold text-slate-900">
                {order.ThongTinNguoiNhan?.HoTen || "Chưa cập nhật"}
              </Text>
            </View>
          </View>

          {/* Phone Number */}
          <View className="flex-row items-center mb-4 bg-white rounded-xl p-3">
            <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
              <Phone size={16} color="#15803d" />
            </View>
            <Text className="flex-1 text-sm text-slate-700 font-medium">
              {order.ThongTinNguoiNhan?.SDT || "Chưa cập nhật"}
            </Text>
            <TouchableOpacity
              onPress={() => handleOnCopyPhone(order.ThongTinNguoiNhan?.SDT!)}
              className="w-8 h-8 bg-slate-100 rounded-full items-center justify-center"
              activeOpacity={0.7}
            >
              <Copy size={16} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Address */}
          <View className="flex-row items-start bg-white rounded-xl p-3">
            <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-3 mt-0.5">
              <MapPin size={16} color="#b91c1c" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-slate-500 mb-1">
                Địa chỉ giao hàng
              </Text>
              <Text className="text-sm text-slate-700 leading-5">
                {order.ThongTinNguoiNhan?.DiaChi || "Chưa cập nhật"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;
