'use client'

import { useSession } from './useSession'

// 현재 유저가 ADMIN 역할인지 확인하는 훅
export function useIsAdmin(): boolean {
  const { data } = useSession()
  return data?.role === 'ADMIN'
}
