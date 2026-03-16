import axiosInstance from '@/lib/axiosInstance'
import { API_PATHS } from '@/context/apiPaths'
import { type BasicResponse } from '@/db/type'
import { type MeResponse } from './type'

// 현재 세션 유저 정보 조회 API
export async function meApi(): Promise<BasicResponse<MeResponse>> {
  const response = await axiosInstance.get<BasicResponse<MeResponse>>(API_PATHS.AUTH.ME)
  return response.data
}
