import axios, { AxiosRequestConfig, AxiosError, AxiosInstance } from "axios";
import { env } from "./env";
import { authState } from "@/hooks/store/auth";
import { tokenService } from "@/lib/utils/tokenServices";

type RequestOptions = AxiosRequestConfig & {
	skipAuth?: boolean;
};

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
	baseURL: env.apiBaseUrl,
	timeout: 30000, // 30 seconds
	headers: {
		"Content-Type": "application/json"
	}
});

// Request interceptor - add auth headers automatically
apiClient.interceptors.request.use(
	(config) => {
		const { accessToken } = authState();
		const skipAuth = (config as RequestOptions).skipAuth;

		// Add auth token if not skipping auth
		if (!skipAuth && accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		// Add API key if available
		if (env.apiKey) {
			config.headers.apikey = env.apiKey;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor - handle common errors
apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError<{ error_description?: string; message?: string }>) => {
		// Handle 401 Unauthorized - session expired
		if (error.response?.status === 401) {
			const { clear } = authState();
			clear();
			tokenService.clear();

			// Optionally redirect to login
			// window.location.href = '/login';

			return Promise.reject(new Error("Session expired. Please sign in again."));
		}

		// Extract error message
		const errorMessage =
			error.response?.data?.error_description ||
			error.response?.data?.message ||
			error.message ||
			"Request failed";

		return Promise.reject(new Error(errorMessage));
	}
);

// Main request function
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const { isAuthed, expiresAt, clear } = authState();

	// Check authentication before making request
	if (!options.skipAuth && (!isAuthed() || (expiresAt && expiresAt <= Date.now() / 1000))) {
		clear();
		tokenService.clear();
		throw new Error("Session expired. Please sign in again.");
	}

	try {
		const response = await apiClient({
			url: path,
			method: options.method || "GET",
			...options
		});

		return response.data as T;
	} catch (error) {
		// Re-throw the error (already formatted by interceptor)
		throw error;
	}
}

// Export axios instance for direct use if needed
export { apiClient };

// ============================================
// HTTP Method Helpers
// ============================================

export const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "GET" }),

	post: <T>(path: string, data?: any, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "POST", data }),

	put: <T>(path: string, data?: any, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "PUT", data }),

	patch: <T>(path: string, data?: any, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "PATCH", data }),

	delete: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "DELETE" })
};
