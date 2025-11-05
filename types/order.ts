import { ORDER_STATUS } from "@/constants/order-status";
import { CT_DonDatHang } from "./orderDetail";


export interface KhachHang {
	MaKH: number;
	TenKH: string;
	SDT: string;
	DiaChi?: string;
	CCCD?: string;
}

export interface NhanVien {
	MaNV: number;
	TenNV: string;
}

export interface TrangThaiDH {
	MaTTDH: number;
	TrangThai: keyof typeof ORDER_STATUS;
}

export interface DonDatHang {
	MaDDH: number;
	MaKH: number;
	MaNV_Duyet?: number | null;
	MaNV_Giao?: number | null;
	NgayTao: string; 
	NgayCapNhat: string; 
	DiaChiGiao?: string;
	ThoiGianGiao?: string;
	NguoiNhan?: string;
	SDT?: string;
	MaTTDH?: number;
	KhachHang?: KhachHang;
	NguoiDuyet?: NhanVien;
	NguoiGiao?: NhanVien;
	TrangThaiDH?: TrangThaiDH;
	CT_DonDatHangs?: CT_DonDatHang[];
}

export type ConfirmDelivery = {
	id: number;
	image: string;
}