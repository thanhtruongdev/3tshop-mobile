export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
	success: boolean;
	message: string;
	data: {
		token: string;
		user: Record<string, unknown>;
		role: string;
		id: number;
		employeeId?: number;
	};
};