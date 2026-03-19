'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { registerApi } from '../api/authApi'
import { type RegisterRequest } from '../api/type'
import { AUTH_MSG } from '@/context/messages/authMsg'

type UseRegisterOptions = {
  onSuccess?: () => void
}

// 계정 등록 mutation 훅
export function useRegister({ onSuccess }: UseRegisterOptions = {}) {
  return useMutation({
    mutationFn: (data: RegisterRequest) => registerApi(data),
    onSuccess: () => {
      toast.success(AUTH_MSG.REGISTER_SUCCESS)
      onSuccess?.()
    },
    onError: (error: Error) => {
      // 등록 실패 시 에러 토스트 표시
      toast.error(error.message ?? AUTH_MSG.REGISTER_FAILED)
    },
  })
}
