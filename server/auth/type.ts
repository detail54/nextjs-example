import { type UserRole, type DbUser } from '@/server/core/db/type'
import { type ServiceDataResult } from '@/server/core/type'

// ─── Repository 파라미터 타입 ─────────────────────────────────────

export type CreateUserParams = {
  username: string
  email: string
  password: string
}

export type UpdateUsernameParams = {
  userId: number
  username: string
}

export type UpdatePasswordParams = {
  userId: number
  password: string
}

export type UpdateRoleParams = {
  userId: number
  role: UserRole
}

// ─── Service 결과 타입 ────────────────────────────────────────────

/** 로그인 결과 */
export type LoginResult = ServiceDataResult<{
  user: Pick<DbUser, 'id' | 'username' | 'role' | 'createdAt'>
  accessToken: string
  refreshToken: string
}>

/** 토큰 갱신 결과 */
export type RefreshTokenResult = ServiceDataResult<{ accessToken: string }>

/** 아이디 찾기 결과 */
export type FindUsernameResult = ServiceDataResult<{ username: string }>
