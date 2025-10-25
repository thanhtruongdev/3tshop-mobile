import { DanhSachSanPhamItem } from "@/types/invoice-response";
import { formatCurrency } from "@/utils/formatter";
import React from "react";
import { FlatList, Text, View } from "react-native";

interface Props {
  items?: DanhSachSanPhamItem[] | null;
}

const ItemRow: React.FC<{ item: DanhSachSanPhamItem; index: number }> = ({
  item,
}) => {
  return (
    <View className="flex-row items-center bg-white py-3 px-3 border-b border-slate-100">
      <View className="flex-1 pr-2">
        <Text className="font-medium text-slate-900 text-sm">
          {item.TenSanPham}
        </Text>
        <Text className="text-xs text-slate-500 mt-1">
          {item.KichThuoc ?? ""}{" "}
          {item.MauSac?.TenMau ? `• ${item.MauSac?.TenMau}` : ""}
        </Text>
      </View>

      <View className="w-20 items-end pr-2">
        <Text className="text-sm text-slate-700">{item.SoLuong}</Text>
      </View>

      <View className="w-28 items-end pr-2">
        <Text className="text-sm text-slate-700">
          {formatCurrency(item.DonGia)}
        </Text>
      </View>

      <View className="w-32 items-end">
        <Text className="text-sm font-semibold text-slate-900">
          {formatCurrency(item.ThanhTien || item.DonGia * item.SoLuong)}
        </Text>
      </View>
    </View>
  );
};

const InvoiceItems: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <View className="px-4 pt-4">
      <View className="bg-white p-0 rounded-lg shadow-sm overflow-hidden">
        {/* Table header */}
        <View className="flex-row bg-slate-50 px-4 py-3 border-b border-slate-100">
          <View className="flex-1 pr-2">
            <Text className="text-xs text-slate-500">SP</Text>
          </View>
          <View className="w-20 items-end pr-2">
            <Text className="text-xs text-slate-500">Số lượng</Text>
          </View>
          <View className="w-28 items-end pr-2">
            <Text className="text-xs text-slate-500">Đơn giá</Text>
          </View>
          <View className="w-32 items-end">
            <Text className="text-xs text-slate-500">Thành tiền</Text>
          </View>
        </View>

        <FlatList
          data={items}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <ItemRow item={item} index={index} />
          )}
          keyExtractor={(it) => it.MaCTDDH.toString()}
        />
      </View>
    </View>
  );
};

export default InvoiceItems;
