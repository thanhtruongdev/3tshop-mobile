import { post, setAuthToken } from "@/lib/http";
import { LoginRequest, LoginResponse } from "@/types/auth.type";
import { setToken, setUserInfor } from "@/utils/storage";
import { showToast } from "@/utils/toast";

export const AuthService = {
  login: async (body: LoginRequest): Promise<LoginResponse | null> => {
    try {
      const res = await post<LoginResponse>("/api/auth/login", body, {
        skipErrorToast: true,
      });
      
      console.log("Login response:", res);
      
      if (res?.data) {
        console.debug("Login response data:", res.data);
        console.debug("User role:", res.data.role);
        
        if (res.data.role === "NhanVienGiaoHang") {
          setAuthToken(res.data.token);
          setToken(res.data.token);
          setUserInfor(res.data.user);
          showToast.success("Đăng nhập thành công!");
          return res;
        } else {
          showToast.warning("Chỉ nhân viên giao hàng mới được phép đăng nhập vào ứng dụng này.");
          return null;
        }
      }
      showToast.error("Không nhận được dữ liệu từ server");
      return null;
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      showToast.error(errorMessage);
      return null;
    }
  },
};
