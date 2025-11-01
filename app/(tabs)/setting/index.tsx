import { Button } from "@/components/common/button";
import LogoutModal from "@/components/setting/LogoutModal";
import ProfileView from "@/components/setting/ProfileView";
import { setAuthToken } from "@/lib/http";
import { NhanVien } from "@/types/user.type";
import { getUserInfor, removeToken, removeUserInfor } from "@/utils/storage";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Toast } from "toastify-react-native";

export default function SettingsScreen() {
  const [user, setUser] = useState<NhanVien | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const u = await getUserInfor();
        setUser(u);
      } catch (error) {
        console.error("Failed to load user info", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    try {
      setAuthToken(null);
      await removeToken();
      await removeUserInfor();
      Toast.success("Đăng xuất thành công");
    } catch (e) {
      console.error("Error during logout cleanup", e);
      Toast.error("Đăng xuất không thành công");
    }
    router.replace("/auth/login");
  };

  return (
    <View className="flex-1 bg-slate-50">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#825B32" />
          <Text className="text-sm text-slate-600 mt-2">
            Đang tải thông tin...
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="px-4 pb-4 mt-8">
            <Text className="text-2xl font-bold text-slate-900">Cài đặt</Text>
            <Text className="text-sm text-slate-500 mt-1">
              Quản lý thông tin cá nhân
            </Text>
          </View>

          <View className="px-4">
            <ProfileView emp={user} />

            {/* Logout Button */}
            <View className="mt-8">
              <View className="bg-white rounded-xl p-4 border border-slate-200">
                <View className="flex-row items-center mb-3">
                  <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-3">
                    <LogOut size={20} color="#64748b" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-slate-900">
                      Đăng xuất
                    </Text>
                    <Text className="text-xs text-slate-500 mt-0.5">
                      Thoát khỏi tài khoản hiện tại
                    </Text>
                  </View>
                </View>

                <Button
                  text="Đăng xuất"
                  textClassName="text-white font-semibold"
                  onSubmit={() => setModalVisible(true)}
                  variant={"PRIMARY"}
                />
              </View>
            </View>

            {/* App Info Footer */}
            <View className="mt-6 py-6 border-t border-slate-200">
              <Text className="text-center text-xs text-slate-500 mb-1">
                3T Shop - Hệ thống quản lý giao hàng
              </Text>
              <Text className="text-center text-xs text-slate-400">
                Version 1.0.0
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      <LogoutModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          handleLogout();
        }}
      />
    </View>
  );
}
