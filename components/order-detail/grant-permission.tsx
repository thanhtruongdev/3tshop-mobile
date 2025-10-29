import { COLORS } from "@/constants/colors";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface GrantPermissionProps {
  showPermissionModal: boolean;
  onClose: () => void;
}

export const GrantPermission = ({
  showPermissionModal,
  onClose,
}: GrantPermissionProps) => {
  return (
    <Modal
      visible={showPermissionModal}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={modalStyles.backdrop}>
        <View style={modalStyles.container}>
          <Text style={modalStyles.title}>Quyền truy cập Camera</Text>
          <Text style={modalStyles.message}>
            Ứng dụng cần quyền truy cập camera để chụp ảnh giao hàng. Vui lòng
            mở cài đặt ứng dụng và cho phép Camera.
          </Text>
          <View style={modalStyles.actions}>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.cancelButton]}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text style={modalStyles.cancelText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.openButton]}
              onPress={() => {
                onClose();
                Linking.openSettings();
              }}
              activeOpacity={0.85}
            >
              <Text style={modalStyles.openText}>Mở cài đặt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
  },
  openButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  cancelText: {
    color: "#111827",
    fontWeight: "600",
  },
  openText: {
    color: "#fff",
    fontWeight: "600",
  },
});
