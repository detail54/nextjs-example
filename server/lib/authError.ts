import { HTTP_STATUS } from '@/server/messages/httpStatus'

export const AuthErrorCode = {
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED' as const,
    status: HTTP_STATUS.UNAUTHORIZED,
  },
  TOKEN_EXPIRED: {
    code: 'TOKEN_EXPIRED' as const,
    status: HTTP_STATUS.UNAUTHORIZED,
  },
  INVALID_TOKEN: {
    code: 'INVALID_TOKEN' as const,
    status: HTTP_STATUS.UNAUTHORIZED,
  },
  FORBIDDEN: {
    code: 'FORBIDDEN' as const,
    status: HTTP_STATUS.FORBIDDEN,
  },
} as const

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode]['code']

// 인증 관련 커스텀 에러 클래스
export class AuthError extends Error {
  readonly code: AuthErrorCode
  readonly statusCode: number

  constructor({ code, status }: (typeof AuthErrorCode)[keyof typeof AuthErrorCode]) {
    super(code)
    this.name = 'AuthError'
    this.code = code
    this.statusCode = status
  }
}
