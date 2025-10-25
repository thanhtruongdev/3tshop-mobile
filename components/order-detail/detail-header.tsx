import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string;
  onBack?: () => void;
}

export const DetailHeader: React.FC<Props> = ({
  title = "Chi tiết đơn hàng",
  onBack,
}) => {
  return (
    <View className="flex-row items-center px-4 pt-4 pb-3 bg-white">
      <TouchableOpacity onPress={onBack} className="p-2">
        <ChevronLeft size={20} color="#374151" />
      </TouchableOpacity>
      <View className="ml-2">
        <Text className="text-lg font-semibold text-slate-900">{title}</Text>
      </View>
    </View>
  );
};

export default DetailHeader;
