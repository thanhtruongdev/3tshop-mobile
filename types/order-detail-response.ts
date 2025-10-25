import { ThongTinDonHang, ThongTinHoaDon, ThongTinKhachHang, ThongTinNguoiNhan, ThongTinXuLy } from "./order-detail-info";
import { DanhSachSanPham } from "./order-product.type";

export type OrderDetailData = {
  ThongTinDonHang?: ThongTinDonHang | null;
  ThongTinNguoiNhan?: ThongTinNguoiNhan | null;
  ThongTinKhachHang?: ThongTinKhachHang | null;
  ThongTinXuLy?: ThongTinXuLy | null;
  DanhSachSanPham: DanhSachSanPham[];
  ThongTinHoaDon?: ThongTinHoaDon | null;
};

export type OrderDetailResponse = {
  success: boolean;
  message?: string;
  data?: OrderDetailData | null;
};

export default OrderDetailResponse;
