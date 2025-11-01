import { NhanVien } from "@/types/user.type";
import { formatCurrency } from "@/utils/formatter";
import {
  Calendar,
  DollarSign,
  IdCard,
  Mail,
  MapPin,
} from "lucide-react-native";
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <View>
      {/* Header Card with Avatar */}
      <View className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <View className="items-center">
          {/* Avatar Circle */}
          <View className="w-24 h-24 rounded-full bg-yellow-900 items-center justify-center mb-4">
            <Text className="text-3xl font-bold text-white">{initials}</Text>
          </View>

          {/* Name */}
          <Text className="text-2xl font-bold text-slate-900 mb-1">
            {emp?.TenNV ?? "-"}
          </Text>

          {/* Employee ID Badge */}
          <View className="bg-slate-100 px-4 py-2 rounded-full">
            <Text className="text-sm font-semibold text-slate-700">
              Mã NV: {emp?.MaNV ?? "-"}
            </Text>
          </View>
        </View>
      </View>

      {/* Info Cards Grid */}
      <View className="mt-4 gap-3">
        {/* Date of Birth */}
        {emp?.NgaySinh && (
          <View className="bg-white rounded-xl p-4 border border-slate-200 flex-row items-center">
            <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-4">
              <Calendar size={20} color="#64748b" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-slate-500 mb-1">Ngày sinh</Text>
              <Text className="text-base font-semibold text-slate-900">
                {formatDate(emp.NgaySinh)}
              </Text>
            </View>
          </View>
        )}

        {/* Address */}
        <View className="bg-white rounded-xl p-4 border border-slate-200 flex-row items-start">
          <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-4">
            <MapPin size={20} color="#64748b" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Địa chỉ</Text>
            <Text className="text-sm font-medium text-slate-900 leading-5">
              {emp?.DiaChi ?? "Chưa cập nhật"}
            </Text>
          </View>
        </View>

        {/* Salary */}
        <View className="bg-white rounded-xl p-4 border border-slate-200 flex-row items-center">
          <View className="w-10 h-10 bg-yellow-100 rounded-full items-center justify-center mr-4">
            <DollarSign size={20} color="#78350f" />
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-500 mb-1">Mức lương</Text>
            <Text className="text-lg font-bold text-yellow-900">
              {emp?.Luong ? formatCurrency(emp.Luong) : "Chưa cập nhật"}
            </Text>
          </View>
        </View>
      </View>

      {/* Account Information Section */}
      <View className="mt-6">
        <Text className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider px-1">
          Thông tin tài khoản
        </Text>

        <View className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
          {/* Account ID */}
          <View className="p-4 flex-row items-center">
            <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-4">
              <IdCard size={20} color="#64748b" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-slate-500 mb-0.5">
                Mã tài khoản
              </Text>
              <Text className="text-sm font-semibold text-slate-900">
                {account?.MaTK ?? emp?.MaTK ?? "-"}
              </Text>
            </View>
          </View>

          {/* Email */}
          <View className="p-4 flex-row items-center">
            <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-4">
              <Mail size={20} color="#64748b" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-slate-500 mb-0.5">Email</Text>
              <Text className="text-sm font-medium text-slate-900">
                {account?.Email ?? "Chưa cập nhật"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileView;
