'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { logoutApi } from '../api/authApi'
import { authKeys } from '../api/queryKeys'
import { APP_PATHS } from '@/context/appPaths'

// 로그아웃 mutation 훅
export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // 세션 쿼리 캐시 초기화 후 로그인 페이지로 이동
      queryClient.removeQueries({ queryKey: authKeys.all })
      router.push(APP_PATHS.HOME)
    },
  })
}
