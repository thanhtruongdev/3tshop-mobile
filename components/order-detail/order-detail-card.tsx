import type { DonDatHang } from "@/types/order";
import React from "react";
import { Text, View } from "react-native";
import ItemsList from "./items-list";

interface Props {
  order: DonDatHang;
}

export const OrderDetailCard: React.FC<Props> = ({ order }) => {
  const total = order.CT_DonDatHangs
    ? order.CT_DonDatHangs.reduce(
        (s, it) => s + Number(it.DonGia || 0) * (it.SoLuong || 0),
        0
      )
    : 0;

  return (
    <View className="px-4 pt-4">
      <View className="bg-white p-4 rounded-lg shadow-sm">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-semibold text-slate-900">
            Tổng đơn hàng
          </Text>
          <Text className="text-base font-bold text-slate-900">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(total)}
          </Text>
        </View>

        <Text className="text-base font-semibold text-slate-800 mb-3">
          Danh sách sản phẩm
        </Text>

        <ItemsList items={order.CT_DonDatHangs} />
      </View>
    </View>
  );
};

export default OrderDetailCard;
