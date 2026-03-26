'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteNoticeApi } from '../api/noticeManageApi'
import { noticeManageKeys } from '../api/queryKeys'
import { noticeKeys } from '@/features/notice/api/queryKeys'
import { NOTICE_MANAGE_MSG } from '@/context/messages/noticeManageMsg'

type UseNoticeDeleteOptions = {
  onSuccess?: () => void
}

// 공지사항 삭제 mutation 훅
export function useNoticeDelete({ onSuccess }: UseNoticeDeleteOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteNoticeApi(id),
    onSuccess: () => {
      // 삭제 시 전체 목록 초기화 (관리 + 공개)
      queryClient.invalidateQueries({ queryKey: noticeManageKeys.lists() })
      queryClient.invalidateQueries({ queryKey: noticeKeys.lists() })
      toast.success(NOTICE_MANAGE_MSG.DELETE_SUCCESS)
      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error(error.message ?? NOTICE_MANAGE_MSG.DELETE_FAILED)
    },
  })
}
