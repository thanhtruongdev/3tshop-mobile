import { InvoiceData } from "@/types/invoice-response";
import React from "react";
import { Image, Text, View } from "react-native";

interface Props {
  data: InvoiceData;
}

const InvoiceSummary: React.FC<Props> = ({ data }) => {
  const info = data.ThongTinHoaDon;
  const customer = data.ThongTinKhachHang;
  const recipient = data.ThongTinNguoiNhan;

  return (
    <View className="px-4 pt-4 pb-3 bg-white">
      {/* Header: Company + Invoice meta */}
      <View className="flex-row justify-start gap-4 items-center">
        <Image
          source={require("../../assets/logo/logo.png")}
          className="w-24 h-24"
          resizeMode="contain"
        />
        <View className="items-start">
          <Text className="text-sm text-slate-500">HÓA ĐƠN BÁN HÀNG</Text>
          <Text className="text-lg font-bold text-yellow-900">
            {info?.SoHD ?? "-"}
          </Text>
          <Text className="text-sm text-slate-500">
            Ngày lập: {new Date(info?.NgayLap!).toLocaleDateString() ?? "-"}
          </Text>
        </View>
      </View>

      {/* From / To block */}
      <View className="flex-row justify-between mt-4">
        <View className="flex-1 pr-2">
          <Text className="text-sm text-slate-500">Người bán</Text>
          <Text className="text-base font-medium text-slate-800">3T Shop</Text>
          <Text className="text-sm text-slate-500">
            97, Man Thiện, phường Tăng Nhơn Phú, TP. HCM
          </Text>
        </View>

        <View className="flex-1 pl-2">
          <Text className="text-sm text-slate-500">Người mua</Text>
          <Text className="text-base font-medium text-slate-800">
            {recipient?.HoTen ?? customer?.TenKH ?? "-"}
          </Text>
          <Text className="text-sm text-slate-500">
            {recipient?.SDT ?? customer?.SDT ?? ""}
          </Text>
          <Text className="text-sm text-slate-500">
            {recipient?.DiaChi ?? customer?.DiaChi ?? ""}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InvoiceSummary;
