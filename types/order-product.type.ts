import { SanPham } from "./product.type";

;

export type DanhSachSanPham = {
  MaCTDDH: number;
  MaCTSP: number;
  SoLuong: number;
  DonGia: number | string;
  ThanhTien?: number | string;
  SoLuongTra?: number;
  SanPham?: SanPham | null;
};

export { };

