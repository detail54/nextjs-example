import type { UserRole } from '@/server/core/db/type'

// ─── 프로필 조회 ─────────────────────────────────────────────────

/** 내 프로필 응답 */
export type MyProfileResponse = {
  id: number
  username: string
  email: string
  role: UserRole
  createdAt: string
}

// ─── 이메일 변경 ─────────────────────────────────────────────────

/** 이메일 변경 요청 */
export type UpdateMyEmailRequest = {
  email: string
  currentPassword: string
}

// ─── 비밀번호 변경 ───────────────────────────────────────────────

/** 비밀번호 변경 요청 */
export type UpdateMyPasswordRequest = {
  currentPassword: string
  newPassword: string
}
