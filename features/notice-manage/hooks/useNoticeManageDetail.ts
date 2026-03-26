'use client'

import { useQuery } from '@tanstack/react-query'
import { getNoticeManageDetail } from '../api/noticeManageApi'
import { noticeManageKeys } from '../api/queryKeys'

// 공지사항 단건 조회 훅 (수정 페이지용)
export function useNoticeManageDetail(id: number) {
  return useQuery({
    queryKey: noticeManageKeys.detail(id),
    queryFn: () => getNoticeManageDetail(id),
    select: (res) => res.data,
    enabled: !isNaN(id) && id > 0,
  })
}
