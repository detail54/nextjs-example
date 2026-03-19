import { type NoticeItem, type NoticeSortBy, type NoticeSortOrder } from '@/features/notice/api/type'

// ─── Notice 서비스 타입 ───────────────────────────────────────────

/** 공지사항 목록 조회 파라미터 */
export type GetNoticesParams = {
  page: number
  pageSize: number
  sortBy: NoticeSortBy
  sortOrder: NoticeSortOrder
}

/** 공지사항 목록 조회 결과 */
export type GetNoticesResult = {
  data: NoticeItem[]
  total: number
  totalPages: number
}
