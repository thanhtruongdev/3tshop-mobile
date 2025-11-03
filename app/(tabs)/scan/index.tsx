import { GrantPermission } from "@/components/common/grant-permission";
import { COLORS } from "@/constants/colors";
import { ORDER_STATUS } from "@/constants/order-status";
import { OrderService } from "@/services/order.service";
import { NhanVien } from "@/types/user.type";
import { getUserInfor } from "@/utils/storage";
import { router, useFocusEffect } from "expo-router";
import { X } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { Toast } from "toastify-react-native";

export default function ScanScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isActive, setIsActive] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const device = useCameraDevice("back");

  useEffect(() => {
    checkPermission();
  }, []);

  // Reset state khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      // Khi màn hình được focus, reset state và kích hoạt camera
      setIsProcessing(false);
      setScannedCode(null);
      setIsActive(true);

      // Cleanup khi màn hình mất focus
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  const checkPermission = async () => {
    if (!hasPermission) {
      const granted = await requestPermission();
      const isGranted = typeof granted === "boolean" ? granted : hasPermission;
      if (!isGranted) {
        setShowPermissionModal(true);
      }
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (isProcessing || !isActive) return;

      if (codes.length > 0 && codes[0].value) {
        const qrValue = codes[0].value;
        console.log("QR Code scanned:", qrValue);
        handleQRCodeScanned(qrValue);
      }
    },
  });

  const handleQRCodeScanned = async (qrValue: string) => {
    try {
      setIsProcessing(true);
      setIsActive(false);
      const orderId = parseInt(qrValue, 10);

      if (isNaN(orderId)) {
        Toast.error("Mã QR không hợp lệ");
        setIsProcessing(false);
        setIsActive(true);
        return;
      }

      setScannedCode(qrValue);

      const currentUser: NhanVien | null = await getUserInfor();
      if (!currentUser) {
        Toast.error("Không thể xác định thông tin người dùng");
        setIsProcessing(false);
        setIsActive(true);
        setScannedCode(null);
        return;
      }

      const orderDetail = await OrderService.getOrderAssignedDetails(orderId);

      if (orderDetail) {
        const deliveryPersonId = orderDetail.ThongTinXuLy?.NguoiGiao?.MaNV;
        const orderStatus = orderDetail.ThongTinDonHang?.TrangThai?.Ten;

        if (orderStatus === "DANGGIAO") {
          if (
            !deliveryPersonId ||
            (deliveryPersonId && deliveryPersonId !== currentUser.MaNV)
          ) {
            Toast.error("Bạn không có quyền xem đơn hàng này");
            setIsProcessing(false);
            setIsActive(true);
            setScannedCode(null);
            return;
          }
          Toast.success(
            `Đã quét mã đơn hàng ${orderId}. Chụp ảnh để xác nhận đã giao hàng.`
          );
          router.push(`/camera?orderId=${orderId}`);
        } else {
          Toast.error(
            `Đơn hàng đã ${ORDER_STATUS[orderStatus!][1]}. Không thể xác nhận giao hàng được nữa`
          );
          setIsProcessing(false);
          setIsActive(true);
          setScannedCode(null);
        }
      } else {
        Toast.error("Không tìm thấy đơn hàng");
        setIsProcessing(false);
        setIsActive(true);
        setScannedCode(null);
      }
    } catch (error) {
      console.error("Error processing QR code:", error);
      Toast.error("Lỗi khi xử lý mã QR");
      setIsProcessing(false);
      setIsActive(true);
      setScannedCode(null);
    }
  };

  const handleRetry = () => {
    setScannedCode(null);
    setIsProcessing(false);
    setIsActive(true);
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <GrantPermission showPermissionModal={true} onClose={() => {}} />
      </SafeAreaView>
    );
  }

  if (!device) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text style={styles.permissionText}>Đang tải camera...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GrantPermission
        showPermissionModal={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
      />

      <View style={styles.cameraContainer}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={!isProcessing && isActive}
          codeScanner={codeScanner}
        />

        {/* Overlay với khung quét */}
        <View style={styles.overlay}>
          <View style={styles.overlayTop} />
          <View style={styles.overlayMiddle}>
            <View style={styles.overlaySide} />
            <View style={styles.scanArea}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
            <View style={styles.overlaySide} />
          </View>
          <View style={styles.overlayBottom}>
            {isProcessing ? (
              <View style={styles.processingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.processingText}>Đang xử lý...</Text>
              </View>
            ) : (
              <Text style={styles.instructionText}>
                Di chuyển camera vào vùng khung để quét mã QR
              </Text>
            )}
          </View>
        </View>
      </View>

      {scannedCode && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Mã đã quét: {scannedCode}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <X size={20} color="#fff" />
            <Text style={styles.retryButtonText}>Quét lại</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCCCCC",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  cameraContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  overlayMiddle: {
    flexDirection: "row",
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scanArea: {
    width: 250,
    height: 250,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 40,
    height: 40,
    borderColor: COLORS.PRIMARY,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scanLineContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanLine: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.PRIMARY,
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  instructionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  processingContainer: {
    alignItems: "center",
  },
  processingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 12,
  },
  resultContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.PRIMARY,
    marginTop: 20,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
