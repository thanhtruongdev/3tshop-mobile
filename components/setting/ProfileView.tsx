import { NhanVien } from "@/types/user.type";
import { formatCurrency } from "@/utils/formatter";
import { DollarSign, MapPin } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  emp: NhanVien | null;
}

const ProfileView: React.FC<Props> = ({ emp }) => {
  const account = emp?.TaiKhoan;

  const initials = (() => {
    const name = emp?.TenNV || "";
    if (!name) return "NV";
    const parts = name.trim().split(" ");
    const last = parts[parts.length - 1] || name;
    return last.slice(0, 2).toUpperCase();
  })();

  return (
    <View className="bg-white p-5 rounded-xl shadow-md">
      {/* Header */}
      <View className="flex-row items-center">
        <View className="w-16 h-16 rounded-full bg-yellow-100 items-center justify-center mr-4">
          <Text className="text-2xl font-bold text-yellow-800">{initials}</Text>
        </View>

        <View className="flex-1">
          <Text className="text-2xl font-extrabold text-slate-900">
            {emp?.TenNV ?? "-"}
          </Text>
          <Text className="text-sm text-slate-400 mt-1">
            Mã nhân viên:{" "}
            <Text className="text-base font-medium text-slate-800">
              {emp?.MaNV ?? "-"}
            </Text>
          </Text>
        </View>
      </View>

      {/* Details cards */}
      <View className="mt-5 space-y-3 flex-col gap-4">
        <View className="bg-slate-50 p-4 rounded-lg flex-row gap-4 items-center">
          <MapPin size={28} color="#6b7280" />
          <View className="flex-col gap-2">
            <Text className="text-sm text-slate-500">Địa chỉ</Text>
            <Text className="text-lg font-medium text-slate-800">
              {emp?.DiaChi ?? "-"}
            </Text>
          </View>
        </View>
        <View className="bg-slate-50 p-4 rounded-lg flex-row gap-4 items-center">
          <DollarSign size={28} color="#6b7280" />
          <View className="flex-col gap-2">
            <Text className="text-sm text-slate-500">Lương</Text>
            <Text className="text-lg font-medium text-slate-800">
              {formatCurrency(emp?.Luong)}
            </Text>
          </View>
        </View>
      </View>

      {/* Account info section */}
      <View className="mt-5 border-t border-slate-100 pt-4">
        <Text className="text-md text-slate-500">Thông tin tài khoản</Text>
        <View className="mt-2">
          <Text className="text-base font-medium text-slate-700">
            Mã tài khoản: {account?.MaTK ?? emp?.MaTK ?? "-"}
          </Text>
          <Text className="text-base text-slate-700 mt-1">
            Email: {account?.Email ?? "-"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileView;
