import { ORDER_STATUS } from "@/constants/order-status";

export type ThongTinDonHang = {
  MaDDH: number;
  NgayTao: string; // ISO date
  TrangThai: {
    Ma: number;
    Ten: keyof typeof ORDER_STATUS;
  } | null;
  TongSoLuong: number;
  TongTien: number;
  HinhMinhChung?: string | null;
};

export type ThongTinNguoiNhan = {
  HoTen: string;
  SDT: string | null;
  DiaChi: string | null;
  ThoiGianGiao?: string | null; // ISO date/time
};

export type ThongTinKhachHang = {
  MaKH: number;
  TenKH: string;
  SDT?: string | null;
  DiaChi?: string | null;
  CCCD?: string | null;
};

export type NguoiNhanXuLy = {
  MaNV: number;
  TenNV: string;
};

export type ThongTinXuLy = {
  NguoiDuyet?: NguoiNhanXuLy | null;
  NguoiGiao?: NguoiNhanXuLy | null;
};

export type ThongTinHoaDon = {
  SoHD?: string | null;
  NgayLap?: string | null; // date string
};

export { };

