import { authService } from '@/server/auth/auth.service'
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, ACCESS_TOKEN_MAX_AGE } from '@/server/auth/jwt'
import { SERVER_AUTH_MSG } from '@/server/auth/authMsg'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import { logger } from '@/server/core/lib/logger'
import { withLogger } from '@/server/core/lib/withLogger'
import { type BasicResponse } from '@/server/core/db/type'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    // 리프레시 토큰 추출
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value
    if (!refreshToken) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: SERVER_AUTH_MSG.UNAUTHORIZED },
        { status: HTTP_STATUS.UNAUTHORIZED },
      )
    }

    const result = await authService.refreshToken(refreshToken)
    if (!result.ok) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: result.message },
        { status: result.status },
      )
    }

    const response = NextResponse.json<BasicResponse<null>>({ success: true, data: null })

    // 새 액세스 토큰 쿠키 세팅
    response.cookies.set(ACCESS_TOKEN_COOKIE, result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: '/',
    })

    return response
  } catch (err) {
    logger.error('POST /api/auth/refresh', err)
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_AUTH_MSG.SERVER_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    )
  }
})
