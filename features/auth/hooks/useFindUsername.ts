'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { findUsernameApi } from '../api/authApi'
import { AUTH_MSG } from '@/context/messages/authMsg'

type UseFindUsernameOptions = {
  onSuccess?: (username: string) => void
  onNotFound?: () => void
}

// 아이디 찾기 mutation 훅
export function useFindUsername({ onSuccess, onNotFound }: UseFindUsernameOptions = {}) {
  return useMutation({
    mutationFn: (email: string) => findUsernameApi({ email }),
    onSuccess: (data) => {
      onSuccess?.(data.data.username)
    },
    onError: (error: Error) => {
      // 404 - 이메일 없음: 별도 콜백 처리
      if (error.message === AUTH_MSG.FIND_USERNAME_NOT_FOUND) {
        onNotFound?.()
        return
      }
      toast.error(error.message ?? AUTH_MSG.FIND_USERNAME_FAILED)
    },
  })
}
