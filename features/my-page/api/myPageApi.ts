import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import { MY_PAGE_MSG } from '@/context/messages/myPageMsg'
import type { BasicResponse } from '@/server/core/db/type'
import type { MyProfileResponse, UpdateMyEmailRequest, UpdateMyPasswordRequest } from './type'

// 내 프로필 조회
export async function getMyProfileApi(): Promise<BasicResponse<MyProfileResponse>> {
  const response = await axios.get<BasicResponse<MyProfileResponse>>(API_PATHS.USERS.ME)
  return response.data
}

// 이메일 변경
export async function updateMyEmailApi(
  data: UpdateMyEmailRequest,
): Promise<BasicResponse<null>> {
  try {
    const response = await axios.put<BasicResponse<null>>(API_PATHS.USERS.UPDATE_MY_EMAIL, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? MY_PAGE_MSG.EMAIL_UPDATE_FAILED)
    }
    throw error
  }
}

// 비밀번호 변경
export async function updateMyPasswordApi(
  data: UpdateMyPasswordRequest,
): Promise<BasicResponse<null>> {
  try {
    const response = await axios.put<BasicResponse<null>>(
      API_PATHS.USERS.UPDATE_MY_PASSWORD,
      data,
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? MY_PAGE_MSG.PASSWORD_UPDATE_FAILED)
    }
    throw error
  }
}
