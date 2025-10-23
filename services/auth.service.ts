import { post, setAuthToken } from "@/lib/http";
import { LoginRequest, LoginResponse } from "@/types/auth.type";
import { setToken } from "@/utils/storage";



export async function login(body: LoginRequest): Promise<LoginResponse | null> {
	const res = await post<LoginResponse>("/api/auth/login", body);
	if (res?.data) {
        setAuthToken(res.data.token);
        setToken(res.data.token)
        return res;
	}
    return null;
}
