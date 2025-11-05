import DetailHeader from "@/components/order-detail/detail-header";
import AnimatedIconButton from "@/components/ui/AnimatedIconButton";
import { COLORS } from "@/constants/colors";
import { OrderService } from "@/services/order.service";
import { getRotationStyle } from "@/utils/animation";
import { getFileUri } from "@/utils/get-uri";
import { uploadImageToCloudinary } from "@/utils/upload-image";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowRight, Check, RefreshCw, X, Zap, ZapOff } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { Toast } from "toastify-react-native";

export default function CameraPage() {
  const camera = useRef<Camera>(null);
  const { orderId } = useLocalSearchParams();
  const [defaultCamera, setDefaultCamera] = React.useState<"back" | "front">(
    "back"
  );
  const [flashMode, setFlashMode] = React.useState<"on" | "off">("off");
  const [photo, setPhoto] = useState<any>(null);
  const [isTakingPhoto, setIsTakingPhoto] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const device = useCameraDevice(defaultCamera, {
    physicalDevices: [
      "ultra-wide-angle-camera",
      "wide-angle-camera",
      "telephoto-camera",
    ],
  });

  const takePhoto = async () => {
    if (camera.current) {
      setIsTakingPhoto(true);
      const result = await camera.current.takePhoto({
        flash: defaultCamera === "back" ? flashMode : "off",
      });
      if (result) {
        setIsTakingPhoto(false);
        setPhoto(result);
      }
    }
  };
  const swapCamera = async () => {
    setDefaultCamera((prev) => (prev === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlashMode((prev) => (prev === "on" ? "off" : "on"));
  };

  const handleComfirmPhoto = async () => {
    try {
      const path = getFileUri(photo.path);
      if (!path) return;
      setIsUploading(true);
      const secureUrl = await uploadImageToCloudinary(path);
      setIsUploading(false);
      if (secureUrl) {
        const res = await OrderService.confirmDelivery({
          id: Number(orderId),
          image: secureUrl,
        });
        if (res) {
          Toast.success("Xác nhận đơn hàng thành công!");
          router.replace("/home");
        }
      } else {
        console.error("Upload failed");
        Toast.error("Xác nhận đơn hàng thất bại!");
      }
    } catch (error) {
      setIsUploading(false);
      console.error("Error in handleComfirmPhoto:", error);
      Toast.error("Xác nhận đơn hàng thất bại!");
    }
  };

  if (photo) {
    return (
      <SafeAreaView className="flex-1">
        <View className="p-2">
          <Image
            source={{ uri: getFileUri(photo.path) }}
            style={[
              styles.previewImage,
              getRotationStyle(photo.orientation),
              photo.isMirrored ? { transform: [{ scaleX: 1 }] } : {},
            ]}
            resizeMode="center"
          />

          <View style={styles.previewActions}>
            <TouchableOpacity
              onPress={() => setPhoto(null)}
              activeOpacity={0.85}
              disabled={isUploading}
              style={[styles.actionButton, styles.cancelButton]}
            >
              <X color={"#111827"} width={26} height={26} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleComfirmPhoto}
              activeOpacity={0.85}
              disabled={isUploading}
              style={[styles.actionButton, styles.acceptButton]}
            >
              {isUploading ? (
                <ActivityIndicator size={"large"} color="#ffffff" />
              ) : (
                <Check color={"#ffffff"} width={28} height={28} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <DetailHeader
        onBack={() => router.back()}
        className="bg-transparent"
        title="Chụp ảnh xác minh"
      />
      <View className="flex-1">
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device!}
          isActive={true}
          resizeMode="cover"
          photo={true}
        />
      </View>
      <View className="absolute bottom-24 flex-col w-full justify-evenly items-center gap-8">
        <View className="bg-yellow-900/50 rounded-lg pl-4 py-2 flex-row gap-4 items-center">
          <Text className="text-white">
            {`Đang xác nhận giao hàng cho \nđơn hàng #${orderId}`}
          </Text>
          <TouchableOpacity
            className="flex-row justify-center items-center mr-3 p-2 gap-1 rounded-md border border-yellow-100/70"
            activeOpacity={0.7}
            onPress={() => router.navigate(`/order-detail?orderId=${orderId}`)}
          >
            <Text className="text-white font-semibold">Xem chi tiết</Text>
            <ArrowRight size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View className="flex-row w-full justify-evenly items-center">
          <AnimatedIconButton
            onPress={swapCamera}
            disabled={isTakingPhoto}
            size={56}
            rotateOnPress
            scaleOnPress={0.7}
            rotateDuration={500}
          >
            <RefreshCw size={40} color="#f8fafc" />
          </AnimatedIconButton>
          <TouchableOpacity
            className={`rounded-full p-1 border-2 border-slate-200 ${isTakingPhoto ? "opacity-80" : ""}`}
            onPress={takePhoto}
            disabled={isTakingPhoto}
            activeOpacity={0.8}
          >
            {isTakingPhoto ? (
              <ActivityIndicator
                size="large"
                color="#f1f5f9"
                className="h-24 w-24"
              />
            ) : (
              <View className="rounded-full bg-slate-100 h-24 w-24"></View>
            )}
          </TouchableOpacity>
          <AnimatedIconButton
            onPress={toggleFlash}
            disabled={isTakingPhoto || defaultCamera === "front"}
            size={56}
            rotateDuration={500}
            scaleOnPress={0.7}
          >
            {flashMode === "on" ? (
              <Zap
                size={40}
                color="#f8fafc"
                className={`${defaultCamera === "front" ? "opacity-50" : ""}`}
              />
            ) : (
              <ZapOff
                size={40}
                color="#f8fafc"
                className={`${defaultCamera === "front" ? "opacity-50" : ""}`}
              />
            )}
          </AnimatedIconButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 8,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewActions: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  actionButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 24,
    // Android shadow
    elevation: 6,
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
    borderWidth: 2,
    borderColor: "#fff",
  },
  acceptButton: {
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
