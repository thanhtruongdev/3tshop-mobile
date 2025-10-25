import { ORDER_STATUS } from "@/constants/order-status";
import type { DonDatHang } from "@/types/order";
import { statusColor } from "@/utils/status-colors";
import { MapPin, Phone } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  order: DonDatHang;
}

export const OrderSummary: React.FC<Props> = ({ order }) => {
  return (
    <View className="px-4 pt-4 pb-3 bg-white">
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-3">
          <Text className="text-sm text-slate-500">Người nhận</Text>
          <Text className="text-base font-semibold text-slate-900">
            {order.NguoiNhan}
          </Text>

          <View className="flex-row items-center mt-2">
            <Phone size={14} color="#6b7280" />
            <Text className="text-md text-slate-500 ml-2">{order.SDT}</Text>
          </View>

          <View className="flex-row items-center mt-2">
            <MapPin size={14} color="#6b7280" />
            <Text
              className="text-md text-slate-500 ml-2 flex-1"
              numberOfLines={2}
            >
              {order.DiaChiGiao}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-sm text-slate-500">Mã đơn</Text>
          <Text className="text-sm font-medium text-slate-800">
            #{order.MaDDH}
          </Text>
          {order.TrangThaiDH?.TrangThai ? (
            <View
              className={`${statusColor(ORDER_STATUS[order.TrangThaiDH?.TrangThai!][0])} px-2 py-0.5 rounded-full`}
            >
              <Text className="text-xs font-medium text-amber-800">
                {ORDER_STATUS[order.TrangThaiDH.TrangThai][1]}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;
