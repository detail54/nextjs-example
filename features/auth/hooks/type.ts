import { UserRole } from '@/server/core/db/type'

// useLogin 훅 옵션 타입
export type UseLoginOptions = {
  onSuccess?: () => void
}

export type UseAuthOptions = {
  role?: UserRole
  isAdmin: boolean
}
