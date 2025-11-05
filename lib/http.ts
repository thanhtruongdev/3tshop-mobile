import { BASE_URL } from '@/constants/apis';
import { getToken, removeToken, removeUserInfor } from '@/utils/storage';
import { showToast } from '@/utils/toast';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { router } from 'expo-router';

// Biến để track current route từ bên ngoài
let currentRoute: string = '';

export function setCurrentRoute(route: string) {
	currentRoute = route;
}

let token: string | null = null;

const instance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

instance.interceptors.request.use(
	async (config) => {
		try {
			const t = token ?? (await getToken());
			if (t && config.headers) {
				config.headers["Authorization"] = `Bearer ${t}`;
			}
		} catch (e) {
			// ignore storage read errors and proceed without Authorization header
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor to normalize errors
instance.interceptors.response.use(
	(res) => res,
	async (error) => {
		const skipToast = error.config?.skipErrorToast === true;
		
		if (error.response) {
			// server responded with a status other than 2xx
			const err = {
				status: error.response.status,
				data: error.response.data,
				message: error.response.data?.message || error.message,
			};
			
			// Nếu response trả về 401 (Unauthorized)
			if (error.response.status === 401) {
				// Kiểm tra xem có đang ở màn hình login không
				const isLoginPage = currentRoute.includes('/auth/login');
				
				// Nếu KHÔNG phải đang ở màn hình login thì mới navigate
				if (!isLoginPage) {
					// Clear token và user info
					setAuthToken(null);
					await removeToken();
					await removeUserInfor();
					
					// Hiển thị toast
					if (!skipToast) {
						showToast.error('Phiên đăng nhập đã hết hạn');
					}
					
					// Navigate to login
					router.replace('/auth/login');
				} else {
					// Nếu đang ở màn hình login, chỉ hiển thị toast (nếu không bị skip)
					if (!skipToast) {
						showToast.error(err.message || 'Đăng nhập thất bại');
					}
				}
			} else if (!skipToast) {
				// Hiển thị toast cho các lỗi khác (ngoại trừ 401)
				showToast.error(err.message || 'Đã xảy ra lỗi');
			}
			
			return Promise.reject(err);
		}
		
		// network / timeout / cancelled
		if (!skipToast) {
			showToast.error(error.message || 'Không thể kết nối đến máy chủ');
		}
		
		return Promise.reject({ message: error.message || "Network Error" });
	}
);

export function setAuthToken(t: string | null) {
	token = t;
}

type HTTPOptions = AxiosRequestConfig & { 
	useFormData?: boolean;
	skipErrorToast?: boolean; // Thêm option để bỏ qua hiển thị toast
};

type HTTPOptionsTyped = AxiosRequestConfig & { 
	useFormData?: boolean;
	skipErrorToast?: boolean;
};

export interface HttpError {
	status?: number;
	data?: object;
	message: string;
}

export async function get<T = object>(url: string, config?: HTTPOptionsTyped): Promise<T> {
	const res: AxiosResponse<T> = await instance.get<T>(url, config);
	return res.data;
}

export async function post<T = object>(url: string, data?: object | FormData, config?: HTTPOptionsTyped): Promise<T> {
	const cfg = { ...(config || {}) } as HTTPOptionsTyped;
	if (cfg.useFormData) {
		cfg.headers = { ...(cfg.headers || {}), "Content-Type": "multipart/form-data" } as Record<string, string>;
	}
	const res: AxiosResponse<T> = await instance.post<T>(url, data as any, cfg);
	return res.data;
}

export async function put<T = object>(url: string, data?: object | FormData, config?: HTTPOptionsTyped): Promise<T> {
	const res: AxiosResponse<T> = await instance.put<T>(url, data as any, config);
	return res.data;
}

export async function del<T = object>(url: string, config?: HTTPOptionsTyped): Promise<T> {
	const res: AxiosResponse<T> = await instance.delete<T>(url, config);
	return res.data;
}

export default instance;
