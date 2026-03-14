'use client'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { loginApi } from '../api/loginApi'
import { type LoginRequest } from '../api/type'
import { type UseLoginOptions } from './type'

// 로그인 mutation 훅
export function useLogin({ onSuccess }: UseLoginOptions = {}) {
  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: () => {
      onSuccess?.()
    },
    onError: (error: Error) => {
      // 로그인 실패 시 에러 토스트 표시
      toast.error(error.message ?? '로그인에 실패했습니다', {
        description: '아이디 또는 비밀번호를 확인해주세요',
      })
    },
  })
}
