import axios from 'axios'
import { API_PATHS } from '@/context/apiPaths'
import type { PageResponse } from '@/db/type'
import type { NoticeItem, NoticeListParams } from './type'

// 게시된 공지사항 페이지 목록 조회
export async function getNoticeList(params: NoticeListParams): Promise<PageResponse<NoticeItem>> {
  const response = await axios.get<PageResponse<NoticeItem>>(API_PATHS.NOTICE.LIST, { params })
  return response.data
}
