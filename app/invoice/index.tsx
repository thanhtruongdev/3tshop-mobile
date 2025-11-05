import InvoiceItems from "@/components/invoice/InvoiceItems";
import InvoiceSummary from "@/components/invoice/InvoiceSummary";
import DetailHeader from "@/components/order-detail/detail-header";
import { COLORS } from "@/constants/colors";
import { InvoiceService } from "@/services/invoice.service";
import { InvoiceData } from "@/types/invoice-response";
import { formatCurrency } from "@/utils/formatter";
import { formatInvoiceAmount } from "@/utils/number-to-words";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvoicePage() {
  const { invoiceId } = useLocalSearchParams();
  const id = invoiceId ? String(invoiceId) : "";
  const [data, setData] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await InvoiceService.getInvoiceDetails(id);
        console.log(res?.ThongTinHoaDon);
        if (res) setData(res);
      } catch (e) {
        console.error("Failed to load invoice", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <DetailHeader title="Chi tiết hóa đơn" onBack={() => router.back()} />

      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text className="text-sm text-slate-500 mt-2">
            Đang tải thông tin hóa đơn...
          </Text>
        </View>
      )}

      {!loading && !data && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-sm text-slate-500">Không tìm thấy hóa đơn</Text>
        </View>
      )}

      {!loading && data && (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <InvoiceSummary data={data} />
          <InvoiceItems items={data.DanhSachSanPham ?? []} />

          {/* Totals breakdown */}
          <View className="px-4 pt-4">
            <View className="bg-white p-4 rounded-lg shadow-sm">
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-semibold text-slate-700">
                  Tổng cộng
                </Text>
                <Text className="text-xl font-bold text-slate-900">
                  {formatCurrency(data.TongGiaTri?.TongTien || 0)}
                </Text>
              </View>

              <View className="mt-3">
                <Text className="text-xs text-slate-500">
                  Số loại sản phẩm: {data.TongGiaTri?.SoLuongSanPham ?? 0} •
                  Tổng số lượng: {data.TongGiaTri?.TongSoLuong ?? 0}
                </Text>
              </View>

              {/* Số tiền bằng chữ */}
              <View className="mt-4 pt-4 border-t border-slate-200">
                <Text className="text-xs text-slate-500 mb-1">
                  Tổng tiền (bằng chữ):
                </Text>
                <Text className="text-sm font-medium text-slate-700 italic">
                  {formatInvoiceAmount(data.TongGiaTri?.TongTien || 0)}
                </Text>
              </View>
            </View>
          </View>

          {/* Thông tin người lập hóa đơn */}
          {data.ThongTinHoaDon?.NhanVienLap && (
            <View className="px-4 pt-4">
              <View className="bg-white p-4 rounded-lg shadow-sm">
                <Text className="text-sm font-semibold text-slate-700 mb-3">
                  Thông tin người lập hóa đơn
                </Text>
                <View className="space-y-2">
                  <View className="flex-row">
                    <Text className="text-sm text-slate-500 w-32">
                      Mã nhân viên:
                    </Text>
                    <Text className="text-sm text-slate-900 font-medium flex-1">
                      {data.ThongTinHoaDon.NhanVienLap.MaNV}
                    </Text>
                  </View>
                  <View className="flex-row">
                    <Text className="text-sm text-slate-500 w-32">
                      Họ và tên:
                    </Text>
                    <Text className="text-sm text-slate-900 font-medium flex-1">
                      {data.ThongTinHoaDon.NhanVienLap.TenNV}
                    </Text>
                  </View>
                  <View className="flex-row">
                    <Text className="text-sm text-slate-500 w-32">
                      Ngày lập:
                    </Text>
                    <Text className="text-sm text-slate-900 font-medium flex-1">
                      {new Date(data.ThongTinHoaDon.NgayLap).toLocaleDateString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Footer / Notes */}
          <View className="px-4 pt-4 pb-8">
            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-sm text-slate-500">
                Chúng tôi cam kết sản phẩm đúng mô tả. Mọi thắc mắc xin liên hệ
                hotline 0988776543.
              </Text>
              <Text className="text-sm text-slate-500 mt-3">
                Cảm ơn quý khách!
              </Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
