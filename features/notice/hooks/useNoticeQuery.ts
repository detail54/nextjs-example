import { useQuery } from '@tanstack/react-query'
import { getNoticeList } from '../api/noticeApi'
import { noticeKeys } from '../api/queryKeys'

// 기본 페이지당 공지사항 수
export const DEFAULT_NOTICE_PAGE_SIZE = 10

// 게시된 공지사항 페이지 목록 조회 쿼리 훅
export function useNoticeQuery(page: number, pageSize: number = DEFAULT_NOTICE_PAGE_SIZE) {
  return useQuery({
    queryKey: noticeKeys.list(page, pageSize),
    queryFn: () => getNoticeList({ page, pageSize }),
  })
}
