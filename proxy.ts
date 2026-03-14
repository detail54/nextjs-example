import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt, AUTH_COOKIE } from '@/lib/jwt'

// 로그인이 필요한 보호 경로
const PROTECTED_PATHS = ['/dashboard', '/admin']

// 로그인 상태에서 접근 불가 경로 (이미 인증된 경우 홈으로 리다이렉트)
const AUTH_ONLY_PATHS = ['/auth/login', '/auth/register']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_COOKIE)?.value

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path))
  const isAuthOnly = AUTH_ONLY_PATHS.some((path) => pathname.startsWith(path))

  // 보호 경로 접근 시 토큰 검증
  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const payload = await verifyJwt(token)
    if (!payload) {
      // 만료되거나 유효하지 않은 토큰 제거 후 로그인 페이지로
      const response = NextResponse.redirect(new URL('/auth/login', request.url))
      response.cookies.delete(AUTH_COOKIE)
      return response
    }
  }

  // 인증 페이지에 이미 로그인 상태로 접근 시 홈으로 리다이렉트
  if (isAuthOnly && token) {
    const payload = await verifyJwt(token)
    if (payload) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // 정적 파일 및 API 라우트 제외
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
