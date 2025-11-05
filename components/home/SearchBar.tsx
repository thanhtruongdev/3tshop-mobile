import { COLORS } from "@/constants/colors";
import { SortOption } from "@/utils/sorter";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { ArrowDownUp } from "lucide-react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "latest", label: "Cập nhật mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "idDesc", label: "Mã đơn: Cao → Thấp" },
  { value: "idAsc", label: "Mã đơn: Thấp → Cao" },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSortChange = useCallback(
    (option: SortOption) => {
      onSortChange(option);
      handleCloseBottomSheet();
    },
    [onSortChange, handleCloseBottomSheet]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <View className="px-4 py-3 bg-white">
      <View className=" flex-row items-center gap-2">
        {/* Search Input */}
        <View className="flex-1 flex-row items-center bg-slate-100 rounded-lg px-3">
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Tìm theo mã đơn, người nhận..."
            value={searchText}
            onChangeText={onSearchChange}
            placeholderTextColor="#64748b"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange("")}>
              <Ionicons name="close-circle" size={20} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>

        {/* Sort Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenBottomSheet}
          className="bg-yellow-900 rounded-lg px-4 h-full flex-row items-center"
        >
          <ArrowDownUp size={20} color={COLORS.TEXT} />
        </TouchableOpacity>
      </View>

      {/* Sort Bottom Sheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        handleIndicatorStyle={{ backgroundColor: "#cbd5e1" }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <View className="p-4 border-b border-slate-200">
            <Text className="text-lg font-semibold text-center">
              Sắp xếp theo
            </Text>
          </View>
          <View className="p-2">
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSortChange(option.value)}
                className="flex-row items-center justify-between p-4 rounded-lg"
                style={{
                  backgroundColor:
                    sortBy === option.value ? "#f0e6da" : "transparent",
                }}
              >
                <Text
                  className="text-base"
                  style={{
                    color: sortBy === option.value ? COLORS.PRIMARY : "#1e293b",
                    fontWeight: sortBy === option.value ? "600" : "400",
                  }}
                >
                  {option.label}
                </Text>
                {sortBy === option.value && (
                  <ArrowDownUp size={20} color={COLORS.PRIMARY} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <View className="p-4">
            <TouchableOpacity
              onPress={handleCloseBottomSheet}
              className="bg-slate-100 rounded-lg py-3"
            >
              <Text className="text-center text-base font-semibold">Đóng</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};
