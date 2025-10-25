import type { CT_DonDatHang } from "@/types/orderDetail";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

interface Props {
  items?: CT_DonDatHang[];
}

const ItemRow: React.FC<{ item: CT_DonDatHang }> = ({ item }) => {
  const name = item.ChiTietSanPham?.SanPham?.TenSP || "Sản phẩm";
  const size = item.ChiTietSanPham?.KichThuoc?.TenKichThuoc || "";
  const color = item.ChiTietSanPham?.Mau?.TenMau || "";
  const price = Number(item.DonGia || 0);
  return (
    <View className="flex-row items-center bg-white py-3 rounded-lg ">
      <Image
        source={require("../../assets/images/package.jpg")}
        style={{ width: 56, height: "100%" }}
        className="rounded-md mr-3"
      />
      <View className="flex-1">
        <Text className="font-medium text-slate-900">{name}</Text>
        <Text className="text-sm text-slate-500 my-1">
          {size} • {color}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-slate-500">
            Số lượng: {item.SoLuong}
          </Text>
          <Text className="text-sm font-semibold text-slate-900">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(price)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const ItemsList: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null;
  return (
    <FlatList
      data={items}
      scrollEnabled={false}
      renderItem={({ item }) => <ItemRow item={item} />}
      keyExtractor={(it) => it.MaCTDDH.toString()}
      ItemSeparatorComponent={() => (
        <View
          style={{ height: 1, marginVertical: 4, backgroundColor: "#f0f0f0" }}
        />
      )}
    />
  );
};

export default ItemsList;
