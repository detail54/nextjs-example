'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateNoticeApi } from '../api/noticeManageApi'
import { noticeManageKeys } from '../api/queryKeys'
import { noticeKeys } from '@/features/notice/api/queryKeys'
import { NOTICE_MANAGE_MSG } from '@/context/messages/noticeManageMsg'
import type { UpdateNoticeRequest } from '../api/type'

type UseNoticeUpdateOptions = {
  page: number
  pageSize: number
  sortBy: string
  sortOrder: string
  onSuccess?: () => void
}

// 공지사항 수정 mutation 훅
export function useNoticeUpdate({
  page,
  pageSize,
  sortBy,
  sortOrder,
  onSuccess,
}: UseNoticeUpdateOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateNoticeRequest }) =>
      updateNoticeApi(id, data),
    onSuccess: (_, { id }) => {
      // 수정 시 해당 페이지 쿼리만 갱신
      queryClient.invalidateQueries({
        queryKey: noticeManageKeys.list(page, pageSize, sortBy, sortOrder),
      })
      // 상세 캐시도 갱신
      queryClient.invalidateQueries({ queryKey: noticeManageKeys.detail(id) })
      // 공개 공지 목록도 갱신
      queryClient.invalidateQueries({ queryKey: noticeKeys.lists() })
      toast.success(NOTICE_MANAGE_MSG.UPDATE_SUCCESS)
      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error(error.message ?? NOTICE_MANAGE_MSG.UPDATE_FAILED)
    },
  })
}
