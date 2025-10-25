import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<Props> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/40">
        <View className="w-11/12 bg-white rounded-lg p-4 gap-6">
          <Text className="text-lg font-semibold text-slate-900 text-center">
            Xác nhận
          </Text>
          <Text className="text-base text-slate-600 text-center">
            Bạn có chắc chắn muốn đăng xuất?
          </Text>

          <View className="flex-row justify-center gap-8 items-center">
            <TouchableOpacity
              onPress={onCancel}
              className="px-3 py-3 bg-slate-100 rounded w-32"
            >
              <Text className="text-base text-slate-600 text-center">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="px-3 py-3 bg-yellow-800 rounded w-32"
            >
              <Text className="text-base text-center text-white">
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
