'use client'

import { UseAuthOptions } from './type'
import { useSession } from './useSession'
import { USER_ROLE } from '@/context/constants'

// 현재 유저가 ADMIN 역할인지 확인하는 훅
export function useAuth(): UseAuthOptions {
  const { data } = useSession()

  return {
    role: data?.role,
    isAdmin: data?.role === USER_ROLE.ADMIN,
  }
}
