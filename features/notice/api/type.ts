// 공지사항 API 타입

/** 공지사항 목록 아이템 */
export type NoticeItem = {
  id: number
  title: string
  content: string
  authorName: string
  isPinned: boolean
  publishedAt: string
  createdAt: string
}

/** 정렬 기준 컬럼 */
export type NoticeSortBy = 'createdAt' | 'title'

/** 정렬 방향 */
export type NoticeSortOrder = 'asc' | 'desc'

/** 공지사항 목록 조회 요청 파라미터 */
export type NoticeListParams = {
  page: number
  pageSize: number
  sortBy?: NoticeSortBy
  sortOrder?: NoticeSortOrder
}
