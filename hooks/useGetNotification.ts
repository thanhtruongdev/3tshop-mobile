import { rtdb } from "@/lib/firebase";
import { Notification } from "@/types/notification.type";
import { getUserInfor } from "@/utils/storage";
import {
    DataSnapshot,
    off,
    onValue,
    ref,
} from "firebase/database";
import { useEffect, useState } from "react";

export function useGetNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [maNhanVien, setMaNhanVien] = useState<number | null>(null);

  // Lấy mã nhân viên từ AsyncStorage
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfor();
        if (userInfo?.MaNV) {
          console.log('Loaded MaNhanVien from storage:', userInfo.MaNV);
          setMaNhanVien(userInfo.MaNV);
        } else {
          console.log('No user info found in storage');
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError(err instanceof Error ? err : new Error("Failed to load user info"));
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // Lắng nghe thông báo realtime
  useEffect(() => {
    if (!maNhanVien) {
      return;
    }

    setLoading(true);
    setError(null);

    // Query trực tiếp đến path notifications/{maNhanVien}
    const notifRef = ref(rtdb, `notifications/${maNhanVien}`);

    const callback = (snapshot: DataSnapshot) => {
      try {
        const val = snapshot.val();
        
        console.log('Notification data from RTDB:', val);
        console.log('MaNhanVien:', maNhanVien);
        
        if (!val) {
          console.log('No notifications found for employee:', maNhanVien);
          setNotifications([]);
          setLoading(false);
          return;
        }

        const data = Object.entries(val).map(([id, n]: any) => ({ 
          id, 
          ...n 
        })) as Notification[];
        
        console.log('Parsed notifications:', data);
        
        // Sắp xếp giảm dần theo ngày tạo
        data.sort(
          (a, b) => (b.ngayTao?._seconds ?? 0) - (a.ngayTao?._seconds ?? 0)
        );
        
        setNotifications(data);
        setLoading(false);
      } catch (err) {
        console.error('Error processing notifications:', err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setLoading(false);
      }
    };

    onValue(notifRef, callback);

    // Cleanup function
    return () => {
      off(notifRef, "value", callback);
    };
  }, [maNhanVien]);

  return { notifications, loading, error, maNhanVien };
}
