import { Mau } from "./color.type";
import { HinhAnh } from "./product-image.type";

export interface SanPham {
    MaSP: number;
    TenSP: string;
    MoTa?: string | null;
    KichThuoc?: string | null;
    MauSac?: Mau | null;
    HinhAnh?: HinhAnh | null;
}