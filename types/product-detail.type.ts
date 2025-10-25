import { Mau } from "./color.type";
import { SanPham } from "./product.type";
import { KichThuoc } from "./size.type";

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