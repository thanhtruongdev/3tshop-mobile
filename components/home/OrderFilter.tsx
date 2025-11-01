import { TABS } from "@/constants/order-status";
import { Filter } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface OrderFilterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: Record<string, number>;
}

export const OrderFilter = ({
  activeTab,
  onTabChange,
  counts,
}: OrderFilterProps) => {
  return (
    <View className="bg-white px-4 py-3 border-b border-slate-100">
      <View className="flex-row items-center mb-3">
        <Filter size={18} color="#64748b" />
        <Text className="text-sm font-medium text-slate-700 ml-2">
          Lọc theo trạng thái
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          const count = counts[tab.key] || 0;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              className={`px-4 py-2.5 rounded-full flex-row items-center ${
                isActive
                  ? "bg-yellow-900"
                  : "bg-slate-100 border border-slate-200"
              }`}
              activeOpacity={0.7}
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive ? "text-white" : "text-slate-700"
                }`}
              >
                {tab.label}
              </Text>
              {count > 0 && (
                <View
                  className={`ml-2 px-2 py-0.5 rounded-full ${
                    isActive ? "bg-yellow-700" : "bg-slate-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold ${
                      isActive ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
