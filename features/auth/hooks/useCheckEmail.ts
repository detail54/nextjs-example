'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { checkEmailApi } from '../api/authApi'
import { AUTH_MSG } from '@/context/messages/authMsg'

type UseCheckEmailOptions = {
  onSuccess?: (available: boolean) => void
}

// 이메일 중복 확인 mutation 훅
export function useCheckEmail({ onSuccess }: UseCheckEmailOptions = {}) {
  return useMutation({
    mutationFn: (email: string) => checkEmailApi(email),
    onSuccess: (data) => {
      onSuccess?.(data.data.available)
    },
    onError: (error: Error) => {
      // 이메일 중복 확인 실패 시 에러 토스트 표시
      toast.error(error.message ?? AUTH_MSG.EMAIL_CHECK_FAILED)
    },
  })
}
