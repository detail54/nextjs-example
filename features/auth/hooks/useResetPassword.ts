'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { resetPasswordApi } from '../api/authApi'
import { AUTH_MSG } from '@/context/messages/authMsg'

type UseResetPasswordOptions = {
  onSuccess?: () => void
}

// 비밀번호 재설정 mutation 훅
export function useResetPassword({ onSuccess }: UseResetPasswordOptions = {}) {
  return useMutation({
    mutationFn: ({
      username,
      email,
      password,
    }: {
      username: string
      email: string
      password: string
    }) => resetPasswordApi({ username, email, password }),
    onSuccess: () => {
      toast.success(AUTH_MSG.RESET_PASSWORD_SUCCESS)
      onSuccess?.()
    },
    onError: (error: Error) => {
      toast.error(error.message ?? AUTH_MSG.RESET_PASSWORD_FAILED)
    },
  })
}
