import { authService } from '@/server/auth/auth.service'
import { type LoginRequest, type LoginResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/core/db/type'
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from '@/server/auth/jwt'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/core/lib/logger'
import { withLogger } from '@/server/core/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: LoginRequest = await request.json()
    const { username, password } = body

    // 로그인 비즈니스 로직은 서비스에 위임
    const result = await authService.login(username, password)
    if (!result.ok) {
      return NextResponse.json<BasicResponse<LoginResponse>>(
        { success: false, data: null as never, message: result.message },
        { status: result.status },
      )
    }

    const { user, accessToken, refreshToken } = result
    const isProd = process.env.NODE_ENV === 'production'

    const response = NextResponse.json<BasicResponse<LoginResponse>>({
      success: true,
      data: { id: user.id, username: user.username, role: user.role, createdAt: user.createdAt },
    })

    // 액세스 토큰 쿠키 (15분, HttpOnly)
    response.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: '/',
    })

    // 리프레시 토큰 쿠키 (7일, HttpOnly, 미들웨어에서 읽을 수 있도록 path: '/')
    response.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: '/',
    })

    return response
  } catch (err) {
    logger.error('POST /api/auth/login', err)
    return NextResponse.json<BasicResponse<LoginResponse>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
