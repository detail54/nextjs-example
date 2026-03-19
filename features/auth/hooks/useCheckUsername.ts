'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { checkUsernameApi } from '../api/authApi'
import { AUTH_MSG } from '@/context/messages/authMsg'

type UseCheckUsernameOptions = {
  onSuccess?: (available: boolean) => void
}

// username 중복 확인 mutation 훅
export function useCheckUsername({ onSuccess }: UseCheckUsernameOptions = {}) {
  return useMutation({
    mutationFn: (username: string) => checkUsernameApi(username),
    onSuccess: (data) => {
      onSuccess?.(data.data.available)
    },
    onError: (error: Error) => {
      // 중복 확인 실패 시 에러 토스트 표시
      toast.error(error.message ?? AUTH_MSG.USERNAME_CHECK_FAILED)
    },
  })
}
