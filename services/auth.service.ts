import { post, setAuthToken } from "@/lib/http";
import { LoginRequest, LoginResponse } from "@/types/auth.type";
import { setToken, setUserInfor } from "@/utils/storage";
import { Toast } from "toastify-react-native";

export const AuthService = {
  login: async (body: LoginRequest): Promise<LoginResponse | null> => {
    const res = await post<LoginResponse>("/api/auth/login", body);
    if (res?.data) {
      console.debug("Login response data:", res.data.role);
      if (res.data.role === "NhanVienGiaoHang") {
        setAuthToken(res.data.token);
        setToken(res.data.token);
        setUserInfor(res.data.user);
        return res;
      } else {
        Toast.error("Chỉ nhân viên giao hàng mới được phép đăng nhập vào ứng dụng này.");
        return null;
      }
    }
    return null;
  },
};
