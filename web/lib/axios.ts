import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_URL } from './constants';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokenPair,
} from './tokens';
import type { TokenPair } from './types/auth.types';
import type { ApiError } from './types/api.types';
import { routes as appRoutes } from './routes';

// ─── Axios Instance ───────────────────────────────────────────────────────────

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Token Refresh Mutex ──────────────────────────────────────────────────────
// Prevents multiple simultaneous 401s from each triggering a refresh.

let isRefreshing = false;
type QueueItem = { resolve: (token: string) => void; reject: (err: unknown) => void };
let failedQueue: QueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token!);
    }
  });
  failedQueue = [];
}

// ─── Request Interceptor ──────────────────────────────────────────────────────

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

axiosClient.interceptors.response.use(
  (response) => {
    // Unwrap NestJS ResponseTransformInterceptor envelope: { data, statusCode, timestamp }
    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      'statusCode' in response.data &&
      'timestamp' in response.data
    ) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Non-401 errors — normalize and throw ApiError
    if (error.response?.status !== 401) {
      const apiError: ApiError = {
        statusCode: error.response?.status ?? 0,
        message:
          error.response?.data?.message ??
          error.message ??
          'An unexpected error occurred',
        errors: error.response?.data?.errors,
      };
      return Promise.reject(apiError);
    }

    // 401 + already retried → refresh also failed → force logout
    if (originalRequest._retry) {
      clearTokens();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
        window.location.href = appRoutes.auth.login();
      }
      const apiError: ApiError = { statusCode: 401, message: 'Session expired. Please log in again.' };
      return Promise.reject(apiError);
    }

    // 401 + refresh currently in progress → queue this request
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          return axiosClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // 401 + first time → attempt token refresh
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
        window.location.href = appRoutes.auth.login();
      }
      return Promise.reject({ statusCode: 401, message: 'No refresh token. Please log in.' } as ApiError);
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Use plain axios to avoid interceptor loop.
      // Server JwtRefreshStrategy reads the token from Authorization: Bearer header.
      const refreshResponse = await axios.post<TokenPair>(
        `${API_URL}/auth/refresh`,
        {},
        { headers: { Authorization: `Bearer ${refreshToken}` } }
      );

      const newTokens: TokenPair = refreshResponse.data;

      setTokenPair(newTokens);
      processQueue(null, newTokens.accessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newTokens.accessToken}`,
      };
      return axiosClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearTokens();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
        window.location.href = appRoutes.auth.login();
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosClient;

// ─── Multipart Upload Helper ──────────────────────────────────────────────────

export async function uploadToServer(
  path: string,
  formData: FormData,
  onUploadProgress?: (percent: number) => void
) {
  return axiosClient.post(path, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onUploadProgress
      ? (e) => {
          if (e.total) {
            onUploadProgress(Math.round((e.loaded * 100) / e.total));
          }
        }
      : undefined,
  });
}
