// 인증 에러 코드
export const AuthErrorCode = {
  UNAUTHORIZED: 'UNAUTHORIZED',   // 토큰 없음 (미로그인)
  TOKEN_EXPIRED: 'TOKEN_EXPIRED', // 토큰 만료
  INVALID_TOKEN: 'INVALID_TOKEN', // 토큰 유효하지 않음
  FORBIDDEN: 'FORBIDDEN',         // 권한 없음 (역할 불일치)
} as const

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode]

// 에러 코드별 HTTP 상태 코드
const STATUS_MAP: Record<AuthErrorCode, number> = {
  UNAUTHORIZED: 401,
  TOKEN_EXPIRED: 401,
  INVALID_TOKEN: 401,
  FORBIDDEN: 403,
}

// 인증 관련 커스텀 에러 클래스
export class AuthError extends Error {
  readonly code: AuthErrorCode
  readonly statusCode: number

  constructor(code: AuthErrorCode) {
    super(code)
    this.name = 'AuthError'
    this.code = code
    this.statusCode = STATUS_MAP[code]
  }
}
