export type NhanVienSimple = {
  MaNV: number;
  TenNV: string;
};

export type TrangThai = {
  Ma: number;
  Ten: string;
};

export type ThongTinHoaDon = {
  SoHD: string;
  NgayLap: string; // YYYY-MM-DD
  NhanVienLap?: NhanVienSimple | null;
};

export type ThongTinDonHang = {
  MaDDH: number;
  NgayDat?: string | null; // ISO datetime
  TrangThai?: TrangThai | null;
  NhanVienGiao?: NhanVienSimple | null;
};

export type ThongTinKhachHang = {
  MaKH: number;
  TenKH: string;
  SDT?: string | null;
  DiaChi?: string | null;
  CCCD?: string | null;
};

export type ThongTinNguoiNhan = {
  HoTen: string;
  SDT?: string | null;
  DiaChi?: string | null;
};

export type MauSacPreview = {
  TenMau: string;
  MaHex?: string | null;
};

export type DanhSachSanPhamItem = {
  MaCTDDH: number;
  TenSanPham: string;
  MauSac?: MauSacPreview | null;
  KichThuoc?: string | null;
  SoLuong: number;
  DonGia: number;
  ThanhTien: number;
};

export type TongGiaTri = {
  TongTien: number;
  SoLuongSanPham: number;
  TongSoLuong: number;
};

export type InvoiceData = {
  ThongTinHoaDon?: ThongTinHoaDon | null;
  ThongTinDonHang?: ThongTinDonHang | null;
  ThongTinKhachHang?: ThongTinKhachHang | null;
  ThongTinNguoiNhan?: ThongTinNguoiNhan | null;
  DanhSachSanPham?: DanhSachSanPhamItem[] | null;
  TongGiaTri?: TongGiaTri | null;
};

export type InvoiceResponse = {
  success: boolean;
  message?: string;
  data?: InvoiceData | null;
};

export default InvoiceResponse;
