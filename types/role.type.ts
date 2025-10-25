import { ROLE } from "@/constants/role";

export type VaiTro = {
    MaVaiTro: number;
    TenVaiTro: keyof typeof ROLE;
}