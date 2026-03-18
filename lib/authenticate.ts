import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken, ACCESS_TOKEN_COOKIE } from './jwt'
import { AuthError, AuthErrorCode } from './authError'
import type { BasicResponse } from '@/db/type'

export async function authenticate(request: NextRequest): Promise<NextResponse | null> {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  if (!token) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '인증이 필요합니다.' },
      { status: 401 },
    )
  }
  try {
    await verifyAccessToken(token)
    return null
  } catch (error) {
    if (error instanceof AuthError && error.code === AuthErrorCode.TOKEN_EXPIRED) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: '토큰이 만료되었습니다.' },
        { status: 401 },
      )
    }
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '유효하지 않은 토큰입니다.' },
      { status: 401 },
    )
  }
}
