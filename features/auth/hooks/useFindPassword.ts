'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { findPasswordApi } from '../api/authApi'
import { AUTH_MSG } from '@/context/messages/authMsg'

type UseFindPasswordOptions = {
  onSuccess?: () => void
  onNotFound?: () => void
}

// 비밀번호 찾기 - 아이디/이메일 검증 mutation 훅
export function useFindPassword({ onSuccess, onNotFound }: UseFindPasswordOptions = {}) {
  return useMutation({
    mutationFn: ({ username, email }: { username: string; email: string }) =>
      findPasswordApi({ username, email }),
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (error: Error) => {
      // 404 - 일치하는 계정 없음: 별도 콜백 처리
      if (error.message === AUTH_MSG.FIND_PASSWORD_NOT_FOUND) {
        onNotFound?.()
        return
      }
      toast.error(error.message ?? AUTH_MSG.FIND_PASSWORD_FAILED)
    },
  })
}
