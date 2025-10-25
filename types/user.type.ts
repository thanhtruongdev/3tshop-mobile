import { TaiKhoan } from "./account.type";

export type NhanVien = {
    MaNV: number;
    TenNV: string;
    NgaySinh?: string;
    DiaChi?: string;
    Luong?: string | number;
    MaTK?: number;
    TaiKhoan?: TaiKhoan | null;
}