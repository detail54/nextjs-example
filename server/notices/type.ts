import { type NoticeItem, type NoticeSortBy, type NoticeSortOrder } from '@/features/notice/api/type'

// ─── 공개 공지 조회 타입 ──────────────────────────────────────────

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

// ─── 관리자 공지 타입 ─────────────────────────────────────────────

/** 관리자 목록 아이템 (isPublished 포함) */
export type NoticeManageItem = {
  id: number
  title: string
  authorName: string
  isPinned: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

/** 관리자 상세 (content 포함) */
export type NoticeManageDetail = {
  id: number
  title: string
  content: string
  authorName: string
  isPinned: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

/** 관리자 목록 조회 결과 */
export type GetNoticeManageResult = {
  data: NoticeManageItem[]
  total: number
  totalPages: number
}

/** 공지 생성 파라미터 */
export type CreateNoticeParams = {
  authorId: number
  title: string
  content: string
  isPinned: boolean
  isPublished: boolean
}

/** 공지 수정 파라미터 */
export type UpdateNoticeParams = {
  title: string
  content: string
  isPinned: boolean
  isPublished: boolean
}
