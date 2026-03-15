import {
  verifyRefreshToken,
  signAccessToken,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
} from '@/lib/jwt'
import { AuthError } from '@/lib/authError'
import { AUTH_MSG } from '@/context/authMsg'
import { type BasicResponse } from '@/db/type'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse<BasicResponse<null>>> {
  try {
    // 리프레시 토큰 추출 및 검증
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, data: null, message: AUTH_MSG.UNAUTHORIZED },
        { status: 401 },
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

    return response
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { success: false, data: null, message: AUTH_MSG.TOKEN_EXPIRED },
        { status: 401 },
      )
    }

    return NextResponse.json(
      { success: false, data: null, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
}
