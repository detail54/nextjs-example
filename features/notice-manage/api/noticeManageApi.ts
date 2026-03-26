import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import { NOTICE_MANAGE_MSG } from '@/context/messages/noticeManageMsg'
import type { BasicResponse, PageResponse } from '@/server/core/db/type'
import type {
  NoticeManageItem,
  NoticeManageDetail,
  NoticeManageListParams,
  CreateNoticeRequest,
  UpdateNoticeRequest,
} from './type'

// 공지사항 목록 조회 (관리자)
export async function getNoticeManageList(
  params: NoticeManageListParams,
): Promise<PageResponse<NoticeManageItem>> {
  const response = await axios.get<PageResponse<NoticeManageItem>>(
    API_PATHS.NOTICE_MANAGE.LIST,
    { params },
  )
  return response.data
}

// 공지사항 단건 조회 (관리자)
export async function getNoticeManageDetail(
  id: number,
): Promise<BasicResponse<NoticeManageDetail>> {
  const response = await axios.get<BasicResponse<NoticeManageDetail>>(
    API_PATHS.NOTICE_MANAGE.DETAIL(id),
  )
  return response.data
}

// 공지사항 생성
export async function createNoticeApi(data: CreateNoticeRequest): Promise<BasicResponse<null>> {
  try {
    const response = await axios.post<BasicResponse<null>>(API_PATHS.NOTICE_MANAGE.CREATE, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? NOTICE_MANAGE_MSG.CREATE_FAILED)
    }
    throw error
  }
}

// 공지사항 수정
export async function updateNoticeApi(
  id: number,
  data: UpdateNoticeRequest,
): Promise<BasicResponse<null>> {
  try {
    const response = await axios.put<BasicResponse<null>>(
      API_PATHS.NOTICE_MANAGE.UPDATE(id),
      data,
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? NOTICE_MANAGE_MSG.UPDATE_FAILED)
    }
    throw error
  }
}

// 공지사항 삭제
export async function deleteNoticeApi(id: number): Promise<BasicResponse<null>> {
  try {
    const response = await axios.delete<BasicResponse<null>>(API_PATHS.NOTICE_MANAGE.DELETE(id))
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? NOTICE_MANAGE_MSG.DELETE_FAILED)
    }
    throw error
  }
}
