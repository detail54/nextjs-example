'use client'

import { useQuery } from '@tanstack/react-query'
import { meApi } from '../api/authApi'
import { authKeys } from '../api/queryKeys'

// 현재 로그인 세션 정보 조회 훅
export function useSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: meApi,
    // 세션은 마이페이지 수정 시 invalidate로 갱신 → 항상 fresh 유지
    staleTime: Infinity,
    // 401 등 에러 시 재시도 없이 null 처리
    retry: false,
    select: (res) => res.data,
  })
}
