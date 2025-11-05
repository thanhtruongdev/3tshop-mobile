import { X } from "lucide-react-native";
import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

interface DeliveryImageModalProps {
  visible: boolean;
  imageUrl: string | null | undefined;
  onClose: () => void;
}

export const DeliveryImageModal: React.FC<DeliveryImageModalProps> = ({
  visible,
  imageUrl,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <ImageViewer
        imageUrls={[
          {
            url: imageUrl || "",
          },
        ]}
        enableSwipeDown={true}
        onSwipeDown={onClose}
        onClick={onClose}
        renderHeader={() => (
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-12 right-4 z-10 bg-black/50 rounded-full p-3"
            activeOpacity={0.8}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <X size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
        backgroundColor="black"
        enableImageZoom={true}
        saveToLocalByLongPress={false}
      />
    </Modal>
  );
};
