import { VaiTro } from "./role.type";

export type TaiKhoan = {
    MaTK: number;
    Email: string;
    Password: string;
    MaVaiTro: number,
    Vaitro?: VaiTro | null;
}