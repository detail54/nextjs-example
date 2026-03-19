import { type DbUser } from '@/server/db/type'

// ─── Auth 서비스 타입 ─────────────────────────────────────────────

type LoginSuccess = {
  ok: true
  /** 로그인한 유저 정보 */
  user: Pick<DbUser, 'id' | 'username' | 'role' | 'createdAt'>
  accessToken: string
  refreshToken: string
}

type LoginFailure = {
  ok: false
  message: string
  status: number
}

export type LoginResult = LoginSuccess | LoginFailure
