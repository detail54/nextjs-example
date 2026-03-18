'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { loginApi } from '../api/loginApi'
import { type LoginRequest } from '../api/type'
import { type UseLoginOptions } from './type'
import { AUTH_MSG } from '@/context/messages/authMsg'

// 로그인 mutation 훅
export function useLogin({ onSuccess }: UseLoginOptions = {}) {
  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (error: Error) => {
      // 로그인 실패 시 에러 토스트 표시
      toast.error(error.message ?? AUTH_MSG.LOGIN_FAILED, {
        description: AUTH_MSG.LOGIN_FAILED_DESC,
      })
    },
  })
}
