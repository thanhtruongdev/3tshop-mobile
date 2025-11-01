import { Inbox, Package2 } from "lucide-react-native";
import { Text, View } from "react-native";

interface EmptyOrdersProps {
  status: string;
  isFiltered?: boolean;
}

export const EmptyOrders = ({
  status,
  isFiltered = false,
}: EmptyOrdersProps) => {
  const getStatusText = () => {
    switch (status) {
      case "DANGGIAO":
        return "đang giao";
      case "HOANTAT":
        return "hoàn tất";
      case "DAHUY":
        return "đã hủy";
      case "TRAHANG":
        return "trả hàng";
      default:
        return "này";
    }
  };

  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center mb-6">
        {isFiltered ? (
          <Inbox size={48} color="#94a3b8" />
        ) : (
          <Package2 size={48} color="#94a3b8" />
        )}
      </View>

      <Text className="text-xl font-bold text-slate-900 mb-2 text-center">
        {isFiltered ? "Không tìm thấy đơn hàng" : "Chưa có đơn hàng"}
      </Text>

      <Text className="text-sm text-slate-500 text-center leading-5">
        {isFiltered
          ? `Không có đơn hàng nào ở trạng thái ${getStatusText()}`
          : "Bạn chưa được phân công đơn hàng nào"}
      </Text>
    </View>
  );
};
