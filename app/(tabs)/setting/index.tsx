import { Button } from "@/components/common/button";
import LogoutModal from "@/components/setting/LogoutModal";
import ProfileView from "@/components/setting/ProfileView";
import { setAuthToken } from "@/lib/http";
import { NhanVien } from "@/types/user.type";
import { getUserInfor, removeToken, removeUserInfor } from "@/utils/storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Toast } from "toastify-react-native";

export default function SettingsScreen() {
  const [user, setUser] = useState<NhanVien | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const u = await getUserInfor();
      setUser(u);
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
    <View className="flex-1 bg-slate-50 px-4 pt-6">
      <ProfileView emp={user} />

      <View className="mt-6">
        <Button
          text="Đăng xuất"
          textClassName="text-white"
          onSubmit={() => setModalVisible(true)}
          variant={"PRIMARY"}
        />
      </View>

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
