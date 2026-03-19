import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { type BasicResponse } from '@/server/db/type'
import { type LoginRequest, type LoginResponse, type MeResponse, type RegisterRequest, type CheckUsernameResponse } from './type'

// 로그인
export async function loginApi(data: LoginRequest): Promise<BasicResponse<LoginResponse>> {
  try {
    const response = await axios.post<BasicResponse<LoginResponse>>(API_PATHS.AUTH.LOGIN, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? AUTH_MSG.LOGIN_FAILED)
    }
    throw error
  }
}

// 로그아웃
export async function logoutApi(): Promise<BasicResponse<null>> {
  const response = await axios.post<BasicResponse<null>>(API_PATHS.AUTH.LOGOUT)
  return response.data
}

// 현재 세션 유저 정보 조회
export async function meApi(): Promise<BasicResponse<MeResponse>> {
  const response = await axios.get<BasicResponse<MeResponse>>(API_PATHS.AUTH.ME)
  return response.data
}

// 계정 등록
export async function registerApi(data: RegisterRequest): Promise<BasicResponse<null>> {
  try {
    const response = await axios.post<BasicResponse<null>>(API_PATHS.AUTH.REGISTER, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? AUTH_MSG.REGISTER_FAILED)
    }
    throw error
  }
}

// username 중복 확인
export async function checkUsernameApi(
  username: string,
): Promise<BasicResponse<CheckUsernameResponse>> {
  try {
    const response = await axios.post<BasicResponse<CheckUsernameResponse>>(
      API_PATHS.AUTH.CHECK_USERNAME,
      { username },
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? AUTH_MSG.USERNAME_CHECK_FAILED)
    }
    throw error
  }
}
