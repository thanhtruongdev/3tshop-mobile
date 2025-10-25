export interface SanPham {
  MaSP: number;
  TenSP: string;
}

export interface KichThuoc {
  MaKichThuoc: number;
  TenKichThuoc: string;
}

export interface Mau {
  MaMau: number;
  TenMau: string;
  MaHex?: string;
}

export interface ChiTietSanPham {
  MaCTSP: number;
  MaSP: number;
  MaKichThuoc: number;
  MaMau: number;
  SoLuongTon: number;
  SanPham?: SanPham;
  KichThuoc?: KichThuoc;
  Mau?: Mau;
}

export interface CT_DonDatHang {
  MaCTDDH: number;
  MaDDH: number;
  MaCTSP: number;
  SoLuong: number;
  DonGia: string | number; // API sometimes returns string formatted number
  SoLuongTra?: number;
  MaPhieuTra?: number | null;
  ChiTietSanPham?: ChiTietSanPham;
}

export type OrderDetailList = CT_DonDatHang[];
