'use client'

import { useQuery } from '@tanstack/react-query'
import { getNoticeManageList } from '../api/noticeManageApi'
import { noticeManageKeys } from '../api/queryKeys'
import type { NoticeSortBy, NoticeSortOrder } from '@/features/notice/api/type'

// 기본 페이지당 항목 수
export const DEFAULT_NOTICE_MANAGE_PAGE_SIZE = 10

// 공지사항 관리 목록 조회 훅
export function useNoticeManageQuery(
  page: number,
  pageSize: number = DEFAULT_NOTICE_MANAGE_PAGE_SIZE,
  sortBy: NoticeSortBy = 'createdAt',
  sortOrder: NoticeSortOrder = 'desc',
) {
  return useQuery({
    queryKey: noticeManageKeys.list(page, pageSize, sortBy, sortOrder),
    queryFn: () => getNoticeManageList({ page, pageSize, sortBy, sortOrder }),
  })
}
