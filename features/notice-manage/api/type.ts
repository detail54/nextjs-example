import type { NoticeSortBy, NoticeSortOrder } from '@/features/notice/api/type'

// ─── 목록 조회 ────────────────────────────────────────────────────

/** 관리자 공지사항 목록 아이템 */
export type NoticeManageItem = {
  id: number
  title: string
  authorName: string
  isPinned: boolean
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

/** 목록 조회 파라미터 */
export type NoticeManageListParams = {
  page: number
  pageSize: number
  sortBy?: NoticeSortBy
  sortOrder?: NoticeSortOrder
}

// ─── 단건 조회 ────────────────────────────────────────────────────

/** 공지사항 상세 (폼용) */
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

// ─── 생성 / 수정 ──────────────────────────────────────────────────

/** 공지사항 생성 요청 */
export type CreateNoticeRequest = {
  title: string
  content: string
  isPinned: boolean
  isPublished: boolean
}

/** 공지사항 수정 요청 */
export type UpdateNoticeRequest = {
  title: string
  content: string
  isPinned: boolean
  isPublished: boolean
}
