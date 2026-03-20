import { type UserRole } from '@/server/core/db/type'

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
  email: string
  password: string
}

// username 중복 확인 응답 타입
export type CheckUsernameResponse = {
  available: boolean
}

// email 중복 확인 응답 타입
export type CheckEmailResponse = {
  available: boolean
}

// 아이디 찾기 요청/응답 타입
export type FindUsernameRequest = {
  email: string
}

export type FindUsernameResponse = {
  username: string
}

// 비밀번호 찾기 - 아이디+이메일 검증 요청/응답 타입
export type FindPasswordRequest = {
  username: string
  email: string
}

export type FindPasswordResponse = {
  valid: boolean
}

// 비밀번호 재설정 요청 타입
export type ResetPasswordRequest = {
  username: string
  email: string
  password: string
}
