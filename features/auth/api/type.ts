import { type UserRole } from '@/server/db/type'

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

// 계정 등록 요청 타입
export type RegisterRequest = {
  username: string
  password: string
}

// username 중복 확인 응답 타입
export type CheckUsernameResponse = {
  available: boolean
}
