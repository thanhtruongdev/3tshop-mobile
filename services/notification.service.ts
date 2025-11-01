import { rtdb } from "@/lib/firebase";
import { post } from "@/lib/http";
import { RegistrationNotification } from "@/types/notification.type";
import { ApiResponse } from "@/types/response.type";
import { ref, update } from "firebase/database";

export const NotificationService = {
    register: async (notification: RegistrationNotification) : Promise<ApiResponse<RegistrationNotification>> => {
        console.log('Registering notification:', notification);
        const res = await post<ApiResponse<RegistrationNotification>>('/api/notifications/register', notification);
        return res;
    },

    markAsRead: async (maNhanVien: number, notificationId: string): Promise<void> => {
        try {
            const notificationRef = ref(rtdb, `notifications/${maNhanVien}/${notificationId}`);
            await update(notificationRef, {
                trangThai: 'read',
                ngayDoc: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    },
}