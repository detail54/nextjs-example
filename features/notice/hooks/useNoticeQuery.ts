import { useQuery } from '@tanstack/react-query'
import { getNoticeList } from '../api/noticeApi'
import { noticeKeys } from '../api/queryKeys'

// 페이지당 공지사항 수
export const NOTICE_PAGE_SIZE = 10

// 게시된 공지사항 페이지 목록 조회 쿼리 훅
export function useNoticeQuery(page: number) {
  return useQuery({
    queryKey: noticeKeys.list(page),
    queryFn: () => getNoticeList({ page, pageSize: NOTICE_PAGE_SIZE }),
  })
}
