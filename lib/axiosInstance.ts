import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import { APP_PATHS } from '@/context/appPaths'

// 공통 axios 인스턴스
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

// refresh 시도 없이 에러를 그대로 반환할 엔드포인트 (인증 요청 자체)
const AUTH_ENDPOINTS = [API_PATHS.AUTH.LOGIN, API_PATHS.AUTH.REFRESH]

// 액세스 토큰 만료 시 자동 refresh 후 재시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    const isAuthEndpoint = AUTH_ENDPOINTS.some((url) => originalRequest.url === url)

    // 인증 엔드포인트이거나 이미 재시도한 경우 → 그대로 에러 반환
    if (error.response?.status !== 401 || isAuthEndpoint || originalRequest._retry) {
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      // 리프레시 토큰으로 새 액세스 토큰 발급
      await axiosInstance.post(API_PATHS.AUTH.REFRESH)
      // 원본 요청 재시도
      return axiosInstance(originalRequest)
    } catch {
      // 리프레시도 실패 → 홈 페이지로 이동
      if (typeof window !== 'undefined') {
        window.location.href = APP_PATHS.HOME
      }
      return Promise.reject(error)
    }
  },
)

export default axiosInstance
