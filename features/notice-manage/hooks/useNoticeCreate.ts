'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createNoticeApi } from '../api/noticeManageApi'
import { noticeManageKeys } from '../api/queryKeys'
import { noticeKeys } from '@/features/notice/api/queryKeys'
import { NOTICE_MANAGE_MSG } from '@/context/messages/noticeManageMsg'
import type { CreateNoticeRequest } from '../api/type'

type UseNoticeCreateOptions = {
  onSuccess?: () => void
}

// 공지사항 생성 mutation 훅
export function useNoticeCreate({ onSuccess }: UseNoticeCreateOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateNoticeRequest) => createNoticeApi(data),
    onSuccess: () => {
      // 생성 시 전체 목록 초기화 (관리 + 공개)
      queryClient.invalidateQueries({ queryKey: noticeManageKeys.lists() })
      queryClient.invalidateQueries({ queryKey: noticeKeys.lists() })
      toast.success(NOTICE_MANAGE_MSG.CREATE_SUCCESS)
      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error(error.message ?? NOTICE_MANAGE_MSG.CREATE_FAILED)
    },
  })
}
