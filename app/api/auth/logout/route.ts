import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/jwt'
import { type BasicResponse } from '@/db/type'
import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse<BasicResponse<null>>> {
  const response = NextResponse.json<BasicResponse<null>>({ success: true, data: null })

  // 액세스 토큰 쿠키 제거
  response.cookies.delete(ACCESS_TOKEN_COOKIE)

  // 리프레시 토큰 쿠키 제거 (발급 시 path와 동일하게 설정)
  response.cookies.set(REFRESH_TOKEN_COOKIE, '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  })

  return response
}
