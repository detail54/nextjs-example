'use client'

import { useQuery } from '@tanstack/react-query'
import { getMyProfileApi } from '../api/myPageApi'
import { myPageKeys } from '../api/queryKeys'

// 내 프로필 조회 훅
export function useMyProfile() {
  return useQuery({
    queryKey: myPageKeys.profile(),
    queryFn: getMyProfileApi,
    select: (res) => res.data,
  })
}
