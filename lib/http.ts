import { getToken } from '@/utils/storage';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://wallaby-artistic-horse.ngrok-free.app";

let token: string | null = null;

const instance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 15000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to inject token
// Request interceptor to inject token. We attempt to use the in-memory token
// if available, otherwise fall back to reading the persisted token. Using an
// async interceptor avoids a race where components fire requests before the
// app-level `setAuthToken` has been called.
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
	(error) => {
		if (error.response) {
			// server responded with a status other than 2xx
			const err = {
				status: error.response.status,
				data: error.response.data,
				message: error.response.data?.message || error.message,
			};
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
