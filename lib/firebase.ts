// firebase.ts
import { Notification } from "@/types/notification.type";
import { initializeApp } from "firebase/app";
import {
  DataSnapshot,
  equalTo,
  getDatabase,
  off,
  onValue,
  orderByKey,
  query,
  ref
} from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyBQBF3AF58FW81-6TcCJPPwoyeB7extyzM",
  authDomain: "delivery-3tshop.firebaseapp.com",
  databaseURL:
    "https://delivery-3tshop-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "delivery-3tshop",
  storageBucket: "delivery-3tshop.firebasestorage.app",
  messagingSenderId: "43136991039",
  appId: "1:43136991039:android:b7479de71f8f6b90fe1d8a",
  measurementId: "G-DRZHJSMWL5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);

export function listenNotificationsByNhanVien(
  maNhanVien: number,
  onData: (data: Notification[]) => void
): () => void {
  const notifRef = query(
    ref(rtdb, "notifications"),
    orderByKey(),
    equalTo(String(maNhanVien))
  );

  const callback = (snapshot: DataSnapshot) => {
    const val = snapshot.val();
    if (!val) return onData([]);

    const data = Object.entries(val).map(([id, n]: any) => ({ id, ...n }));
    // Sắp xếp giảm dần theo ngày tạo
    data.sort(
      (a, b) => (b.ngayTao?._seconds ?? 0) - (a.ngayTao?._seconds ?? 0)
    );
    onData(data);
  };

  onValue(notifRef, callback);

  // Hàm cleanup
  return () => off(notifRef, "value", callback);
}
