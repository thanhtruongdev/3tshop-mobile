import { ROLE } from "@/constants/role";
import { NhanVien } from "./user.type";

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
	success: boolean;
	message: string;
	data: {
		token: string;
		user: NhanVien;
		role: keyof typeof ROLE;
		id: number;
		employeeId?: number;
	};
};