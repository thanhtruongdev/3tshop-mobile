import { BASE_URL } from '@/constants/apis';
import { getToken, removeToken, removeUserInfor } from '@/utils/storage';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { router } from 'expo-router';

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
		if (error.response) {
			// server responded with a status other than 2xx
			const err = {
				status: error.response.status,
				data: error.response.data,
				message: error.response.data?.message || error.message,
			};
			
			// Nếu response trả về 401 (Unauthorized), navigate sang trang login
			if (error.response.status === 401) {
				// Clear token và user info
				setAuthToken(null);
				await removeToken();
				await removeUserInfor();
				// Navigate to login
				router.replace('/auth/login');
			}
			
			return Promise.reject(err);
		}
		// network / timeout / cancelled
		return Promise.reject({ message: error.message || "Network Error" });
	}
);

export function setAuthToken(t: string | null) {
	token = t;
}

type HTTPOptions = AxiosRequestConfig & { useFormData?: boolean };

type HTTPOptionsTyped = AxiosRequestConfig & { useFormData?: boolean };

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
