import React from "react";
import { Modal, Text, View } from "react-native";
import { Button } from "../common/button";

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
            <Button
              onSubmit={onCancel}
              className="w-36 rounded-full bg-gray-400"
              text="Hủy"
            />
            <Button
              onSubmit={onConfirm}
              className="w-36 rounded-full bg-yellow-800"
              text="Đăng xuất"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
