import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import { APP_PATHS } from '@/context/appPaths'

// 공통 axios 인스턴스
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

// 액세스 토큰 만료 시 자동 refresh 후 재시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // 401 응답이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급
        await axiosInstance.post(API_PATHS.AUTH.REFRESH)
        // 원본 요청 재시도
        return axiosInstance(originalRequest)
      } catch {
        // 리프레시도 실패 → 로그인 페이지로 이동
        if (typeof window !== 'undefined') {
          window.location.href = APP_PATHS.AUTH.LOGIN
        }
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
