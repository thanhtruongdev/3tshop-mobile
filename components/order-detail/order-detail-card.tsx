import { OrderDetailData } from "@/types/order-detail-response";
import { Package, Receipt } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import ItemsList from "./items-list";

interface Props {
  order: OrderDetailData;
}

export const OrderDetailCard: React.FC<Props> = ({ order }) => {
  const total = order.DanhSachSanPham
    ? order.DanhSachSanPham.reduce(
        (s, it) => s + Number(it.DonGia || 0) * (it.SoLuong || 0),
        0
      )
    : 0;

  const totalItems = order.DanhSachSanPham
    ? order.DanhSachSanPham.reduce((s, it) => s + (it.SoLuong || 0), 0)
    : 0;

  return (
    <View className="px-4 py-4">
      {/* Products Section */}
      <View className="bg-white rounded-2xl p-4 border border-slate-100 mb-4">
        {/* Section Header */}
        <View className="flex-row items-center mb-4">
          <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
            <Package size={20} color="#7c3aed" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-slate-900">
              Danh sách sản phẩm
            </Text>
            <Text className="text-xs text-slate-500">
              {totalItems} sản phẩm • {order.DanhSachSanPham?.length || 0} loại
            </Text>
          </View>
        </View>

        {/* Products List */}
        <ItemsList items={order.DanhSachSanPham} />
      </View>

      {/* Order Summary */}
      <View className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4 border border-yellow-200">
        <View className="flex-row items-center mb-4">
          <View className="w-10 h-10 bg-yellow-900 rounded-full items-center justify-center mr-3">
            <Receipt size={20} color="#ffffff" />
          </View>
          <Text className="text-lg font-bold text-slate-900">
            Tổng đơn hàng
          </Text>
        </View>

        <View className="bg-white rounded-xl p-4">
          {/* Subtotal */}
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-slate-600">Tạm tính</Text>
            <Text className="text-sm text-slate-900">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </Text>
          </View>

          {/* Item Count */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm text-slate-600">Số lượng sản phẩm</Text>
            <Text className="text-sm text-slate-900">{totalItems} SP</Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-slate-200 my-3" />

          {/* Total */}
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-slate-900">
              Tổng cộng
            </Text>
            <Text className="text-xl font-bold text-yellow-900">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailCard;
