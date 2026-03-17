import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken, ACCESS_TOKEN_COOKIE, type JwtUserPayload } from './jwt'
import { AuthError, AuthErrorCode } from './authError'
import { AUTH_MSG } from '@/context/authMsg'
import { type UserRole, type BasicResponse } from '@/db/type'
import { withLogger } from './withLogger'
import { logger } from './logger'

// 에러 코드 → 문구 매핑
const AUTH_ERROR_MSG: Record<AuthErrorCode, string> = {
  UNAUTHORIZED: AUTH_MSG.UNAUTHORIZED,
  TOKEN_EXPIRED: AUTH_MSG.TOKEN_EXPIRED,
  INVALID_TOKEN: AUTH_MSG.INVALID_TOKEN,
  FORBIDDEN: AUTH_MSG.FORBIDDEN,
}

type WithAuthOptions = {
  roles?: UserRole[] // 허용할 역할 목록 (미지정 시 모든 인증 유저 허용)
}

type AuthedHandler = (
  request: NextRequest,
  context: { user: JwtUserPayload },
) => Promise<NextResponse>

// 액세스 토큰에서 유저 정보 추출 (withLogger의 user 공급자)
async function getUserFromToken(
  request: NextRequest,
): Promise<{ username: string; role: string } | undefined> {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  if (!token) return undefined
  try {
    const { username, role } = await verifyAccessToken(token)
    return { username, role }
  } catch {
    return undefined
  }
}

// 인증/권한 검사를 처리하는 route 래퍼
export function withAuth(handler: AuthedHandler, options: WithAuthOptions = {}) {
  return withLogger(async (request: NextRequest) => {
    try {
      // 쿠키에서 액세스 토큰 추출
      const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
      if (!token) throw new AuthError(AuthErrorCode.UNAUTHORIZED)

      // 액세스 토큰 검증 (만료/유효하지 않음 구분)
      const user = await verifyAccessToken(token)

      // 역할 검사
      if (options.roles && !options.roles.includes(user.role)) {
        throw new AuthError(AuthErrorCode.FORBIDDEN)
      }

      return await handler(request, { user })
    } catch (error) {
      if (error instanceof AuthError) {
        return NextResponse.json<BasicResponse<never>>(
          { success: false, data: null as never, message: AUTH_ERROR_MSG[error.code] },
          { status: error.statusCode },
        )
      }

      logger.error(`${request.method} ${request.nextUrl.pathname}`, error)
      return NextResponse.json<BasicResponse<never>>(
        { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
        { status: 500 },
      )
    }
  }, getUserFromToken)
}
