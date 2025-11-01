import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string;
  onBack?: () => void;
  className?: string;
}

export const DetailHeader: React.FC<Props> = ({
  title = "Chi tiết đơn hàng",
  onBack,
  className,
}) => {
  return (
    <View
      className={`flex-row items-center justify-between px-4 py-4 bg-white border-b border-slate-100 ${className}`}
    >
      <View className="flex-row items-center flex-1">
        <TouchableOpacity
          onPress={onBack}
          className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-3"
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-900">{title}</Text>
      </View>
    </View>
  );
};

export default DetailHeader;
