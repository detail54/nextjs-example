'use client'

import { useQuery } from '@tanstack/react-query'
import { meApi } from '../api/meApi'
import { authKeys } from '../api/queryKeys'

// 현재 로그인 세션 정보 조회 훅
export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: meApi,
    // 401 등 에러 시 재시도 없이 null 처리
    retry: false,
    select: (res) => res.data,
  })
}
