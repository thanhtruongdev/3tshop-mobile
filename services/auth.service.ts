import { post, setAuthToken } from "@/lib/http";
import { LoginRequest, LoginResponse } from "@/types/auth.type";
import { setToken, setUserInfor } from "@/utils/storage";

export const AuthService = {
    login: async (body: LoginRequest): Promise<LoginResponse | null> => {
        const res = await post<LoginResponse>("/api/auth/login", body);
        if (res?.data) {
            console.debug("Login response data:", res.data.user);
            setAuthToken(res.data.token);
            setToken(res.data.token);
            setUserInfor(res.data.user);
            return res;
        }
        return null;
    },
};


