import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken, ACCESS_TOKEN_COOKIE } from './jwt'
import { AuthError, AuthErrorCode } from './authError'
import { SERVER_AUTH_MSG } from './auth.message'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import type { BasicResponse } from '@/server/core/db/type'

export async function authenticate(request: NextRequest): Promise<NextResponse | null> {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  if (!token) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_AUTH_MSG.UNAUTHORIZED },
      { status: HTTP_STATUS.UNAUTHORIZED },
    )
  }
  try {
    await verifyAccessToken(token)
    return null
  } catch (error) {
    if (error instanceof AuthError && error.code === AuthErrorCode.TOKEN_EXPIRED.code) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: SERVER_AUTH_MSG.TOKEN_EXPIRED },
        { status: HTTP_STATUS.UNAUTHORIZED },
      )
    }
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_AUTH_MSG.INVALID_TOKEN },
      { status: HTTP_STATUS.UNAUTHORIZED },
    )
  }
}

// 인증 + ADMIN 역할 검사 (동적 라우트에서 사용)
export async function authenticateAdmin(request: NextRequest): Promise<NextResponse | null> {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  if (!token) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_AUTH_MSG.UNAUTHORIZED },
      { status: HTTP_STATUS.UNAUTHORIZED },
    )
  }
  try {
    const user = await verifyAccessToken(token)
    if (user.role !== 'ADMIN') {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: SERVER_AUTH_MSG.FORBIDDEN },
        { status: HTTP_STATUS.FORBIDDEN },
      )
    }
    return null
  } catch (error) {
    if (error instanceof AuthError && error.code === AuthErrorCode.TOKEN_EXPIRED.code) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: SERVER_AUTH_MSG.TOKEN_EXPIRED },
        { status: HTTP_STATUS.UNAUTHORIZED },
      )
    }
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_AUTH_MSG.INVALID_TOKEN },
      { status: HTTP_STATUS.UNAUTHORIZED },
    )
  }
}
