import { ChiTietSanPham } from "./product-detail.type";

export type CT_DonDatHang = {
  MaCTDDH: number;
  MaDDH: number;
  MaCTSP: number;
  SoLuong: number;
  DonGia: string | number;
  SoLuongTra?: number;
  MaPhieuTra?: number | null;
  ChiTietSanPham?: ChiTietSanPham;
}

export type OrderDetailReponse = {
  ThongTinDonHang?: any;
  ThongTinNguoiNhan?: any;
  ThongTinKhachHang?: any;
  DanhSachSanPham?: CT_DonDatHang[];
  ThongTinHoaDon?: any;
}