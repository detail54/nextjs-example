import { authRepository } from '@/features/auth/api/auth.repository'
import { type LoginRequest, type LoginResponse } from '@/features/auth/api/type'
import { type BasicResponse, type DbUser } from '@/db/type'
import {
  signAccessToken,
  signRefreshToken,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from '@/lib/jwt'
import { AUTH_MSG } from '@/context/authMsg'
import { logger } from '@/lib/logger'
import { withLogger } from '@/lib/withLogger'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: LoginRequest = await request.json()
    const { username, password } = body

    // DB에서 유저 조회
    const user = authRepository.findByUsername(username) as DbUser | undefined
    if (!user) {
      logger.auth({ event: 'LOGIN_FAIL', username, reason: 'user not found' })
      return NextResponse.json<BasicResponse<LoginResponse>>(
        { success: false, data: null as never, message: AUTH_MSG.INVALID_CREDENTIALS },
        { status: 401 },
      )
    }

    // 비밀번호 검증
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      logger.auth({ event: 'LOGIN_FAIL', username, reason: 'invalid password' })
      return NextResponse.json<BasicResponse<LoginResponse>>(
        { success: false, data: null as never, message: AUTH_MSG.INVALID_CREDENTIALS },
        { status: 401 },
      )
    }

    const tokenPayload = { userId: user.id, username: user.username, role: user.role }

    // 액세스 토큰 (15분) + 리프레시 토큰 (7일) 발급
    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(tokenPayload),
      signRefreshToken(tokenPayload),
    ])

    const response = NextResponse.json<BasicResponse<LoginResponse>>({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
    })

    const isProd = process.env.NODE_ENV === 'production'

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

    logger.auth({ event: 'LOGIN_SUCCESS', username: user.username })
    return response
  } catch (err) {
    logger.error('POST /api/auth/login', err)
    return NextResponse.json<BasicResponse<LoginResponse>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
