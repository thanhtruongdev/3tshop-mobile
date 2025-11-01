export type RegistrationNotification = {
    id?: string;
    maNhanVien: string;
    maThietBi: string;
    nhaCungCap: 'fcm' | 'expo' | 'apns';
    nenTang: string;
    token: string;
}

export type Notification = {
    id: string;
    maNhanVien: number;
    loai: "SYSTEM_ALERT";
    tieuDe: string;
    noiDung: string;
    duLieu: {
        orderId?: string;
        screen?: string;
    };
    trangThai: "unread" | "read";
    ngayGui: { "_seconds": 1710000160 };
    ngayTao: { "_seconds": 1710000160 };
    ngayDoc: string | null;

}