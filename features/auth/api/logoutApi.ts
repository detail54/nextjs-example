import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import { type BasicResponse } from '@/server/db/type'

// 로그아웃 API 호출 함수
export async function logoutApi(): Promise<BasicResponse<null>> {
  const response = await axios.post<BasicResponse<null>>(API_PATHS.AUTH.LOGOUT)
  return response.data
}
