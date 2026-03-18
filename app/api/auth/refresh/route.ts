import {
  verifyRefreshToken,
  signAccessToken,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
} from '@/server/lib/jwt'
import { AuthError } from '@/server/lib/authError'
import { SERVER_AUTH_MSG } from '@/server/messages/authMsg'
import { HTTP_STATUS } from '@/server/messages/httpStatus'
import { logger } from '@/server/lib/logger'
import { withLogger } from '@/server/lib/withLogger'
import { type BasicResponse } from '@/server/db/type'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    // 리프레시 토큰 추출 및 검증
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value
    if (!refreshToken) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: SERVER_AUTH_MSG.UNAUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED },
      )
    }

    const user = await verifyRefreshToken(refreshToken)

    // 새 액세스 토큰 발급
    const newAccessToken = await signAccessToken({
      userId: user.userId,
      username: user.username,
      role: user.role,
    })

    const response = NextResponse.json<BasicResponse<null>>({ success: true, data: null })

    response.cookies.set(ACCESS_TOKEN_COOKIE, newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: '/',
    })

    logger.auth({ event: 'TOKEN_REFRESH', username: user.username })
    return response
  } catch (error) {
    if (error instanceof AuthError) {
      logger.auth({ event: 'SESSION_EXPIRED', reason: 'refresh token expired' })
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: SERVER_AUTH_MSG.TOKEN_EXPIRED },
        { status: HTTP_STATUS.UNAUTHORIZED },
      )
    }

    logger.error('POST /api/auth/refresh', error)
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_AUTH_MSG.SERVER_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    )
  }
})
