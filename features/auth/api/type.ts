import { type UserRole } from '@/db/type'

export type CreateUserParams = {
  username: string
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

// 로그인 요청 타입
export type LoginRequest = {
  username: string
  password: string
}

// 로그인 성공 응답 - 유저 데이터
export type LoginResponse = {
  id: number
  username: string
  role: UserRole
  createdAt: string
}

// 현재 세션 유저 데이터 (JWT 페이로드 기반)
export type MeResponse = {
  userId: number
  username: string
  role: UserRole
}
