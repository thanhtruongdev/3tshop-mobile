import { DanhSachSanPham } from "@/types/order-product.type";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

interface Props {
  items: DanhSachSanPham[];
}

const ItemRow: React.FC<{ item: DanhSachSanPham; index: number }> = ({
  item,
  index,
}) => {
  const name = item.SanPham?.TenSP || "Sản phẩm";
  const size = item.SanPham?.KichThuoc || "";
  const color = item.SanPham?.MauSac?.TenMau || "";
  const price = Number(item?.DonGia || 0);
  const quantity = item.SoLuong || 0;
  const subtotal = price * quantity;

  return (
    <View className="flex-row items-start bg-white rounded-xl p-3 border border-slate-100">
      {/* Index Badge */}
      <View className="w-6 h-6 bg-yellow-900 rounded-full items-center justify-center mr-3 mt-1">
        <Text className="text-white text-xs font-bold">{index + 1}</Text>
      </View>

      {/* Product Image */}
      <Image
        source={{ uri: item.SanPham?.HinhAnh?.DuongDan || "" }}
        style={{ width: 72, height: 72 }}
        className="rounded-lg mr-3"
        resizeMode="cover"
      />

      {/* Product Info */}
      <View className="flex-1">
        <Text
          className="text-base font-semibold text-slate-900 mb-1"
          numberOfLines={2}
        >
          {name}
        </Text>

        {/* Size and Color */}
        <View className="flex-row items-center gap-2 mb-2">
          {size && (
            <View className="bg-slate-100 px-2 py-1 rounded">
              <Text className="text-xs text-slate-600">Size: {size}</Text>
            </View>
          )}
          {color && (
            <View className="bg-slate-100 px-2 py-1 rounded">
              <Text className="text-xs text-slate-600">{color}</Text>
            </View>
          )}
        </View>

        {/* Price and Quantity */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-slate-100 px-2 py-1 rounded-lg flex-row items-center">
              <Text className="text-sm font-bold text-slate-900 mx-2">
                {quantity}
              </Text>
            </View>
            <Text className="text-xs text-slate-500 ml-2">
              ×{" "}
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
            </Text>
          </View>
        </View>

        {/* Subtotal */}
        <View className="mt-2 pt-2 border-t border-slate-100">
          <Text className="text-sm font-bold text-yellow-900">
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(subtotal)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const ItemsList: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <View className="py-8 items-center">
        <Text className="text-sm text-slate-500">Không có sản phẩm nào</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      scrollEnabled={false}
      renderItem={({ item, index }) => <ItemRow item={item} index={index} />}
      keyExtractor={(it) => it.MaCTDDH.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
};

export default ItemsList;
