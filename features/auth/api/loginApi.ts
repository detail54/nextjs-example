import axios from 'axios'
import axiosInstance from '@/lib/axiosInstance'
import { API_PATHS } from '@/context/apiPaths'
import { AUTH_MSG } from '@/context/authMsg'
import { type BasicResponse } from '@/db/type'
import { type LoginRequest, type LoginResponse } from './type'

// 로그인 API 호출 함수
export async function loginApi(data: LoginRequest): Promise<BasicResponse<LoginResponse>> {
  try {
    const response = await axiosInstance.post<BasicResponse<LoginResponse>>(
      API_PATHS.AUTH.LOGIN,
      data,
    )
    return response.data
  } catch (error) {
    // 서버 응답 메시지를 에러로 전달
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? AUTH_MSG.LOGIN_FAILED)
    }
    throw error
  }
}
