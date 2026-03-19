import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify, SignJWT } from 'jose'
import type { UserRole } from '@/server/core/db/type'
import { MENU_LIST } from '@/context/menuConfig'
import { APP_PATHS } from '@/context/appPaths'
import { logger } from '@/server/core/lib/logger'

const ACCESS_COOKIE = process.env.ACCESS_TOKEN_COOKIE_NAME!
const REFRESH_COOKIE = process.env.REFRESH_TOKEN_COOKIE_NAME!
const accessSecret = () => new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
const refreshSecret = () => new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

// 인증 처리에서 제외할 경로
const PUBLIC_PATHS: string[] = [
  APP_PATHS.HOME,
  APP_PATHS.AUTH.LOGIN,
  APP_PATHS.AUTH.REGISTER,
  APP_PATHS.AUTH.FIND_USERNAME,
  APP_PATHS.AUTH.FIND_PASSWORD,
  APP_PATHS.UNAUTHORIZED,
  APP_PATHS.LOGIN_REQUIRED,
  APP_PATHS.SESSION_EXPIRED,
]

// 인증 API는 proxy에서 처리하지 않음 (login, logout, refresh 자체)
const AUTH_API_PREFIX = '/api/auth'

type TokenPayload = { userId: number; username: string; role: UserRole }

// 액세스 토큰 검증
async function verifyAccess(token: string): Promise<TokenPayload> {
  const { payload } = await jwtVerify(token, accessSecret())
  return payload as unknown as TokenPayload
}

// 리프레시 토큰 검증 후 새 액세스 토큰 발급
async function rotateAccessToken(
  token: string,
): Promise<{ newToken: string; payload: TokenPayload }> {
  const { payload } = await jwtVerify(token, refreshSecret())
  const data = payload as unknown as TokenPayload
  const newToken = await new SignJWT({
    userId: data.userId,
    username: data.username,
    role: data.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(accessSecret())
  return { newToken, payload: data }
}

// 경로별 역할 권한 체크
function hasRoleAccess(pathname: string, role: UserRole): boolean {
  const menuItem = MENU_LIST.find((item) => pathname.startsWith(item.path))
  return !menuItem || menuItem.roles.length === 0 || menuItem.roles.includes(role)
}

// 새 액세스 토큰을 response 쿠키 + 포워딩 request 헤더에 동시 반영
function buildRefreshedResponse(request: NextRequest, newToken: string): NextResponse {
  const cookies = request.cookies.getAll()
  const updatedCookieHeader = cookies
    .map((c) => (c.name === ACCESS_COOKIE ? `${c.name}=${newToken}` : `${c.name}=${c.value}`))
    .join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('cookie', updatedCookieHeader)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.cookies.set(ACCESS_COOKIE, newToken, {
    httpOnly: true,
    maxAge: 15 * 60,
    path: '/',
    sameSite: 'lax',
    // production 환경에서는 HTTPS 강제
    secure: process.env.NODE_ENV === 'production',
  })
  return response
}

// API 요청 여부 판별 (페이지 이동 vs axios 등 fetch 요청)
// API 요청은 redirect 대신 JSON 에러 응답 반환
function isApiRequest(pathname: string): boolean {
  return pathname.startsWith('/api/')
}

// 인증 실패 응답 - API는 JSON 401, 페이지는 redirect
function unauthorized(request: NextRequest, redirectPath: string): NextResponse {
  if (isApiRequest(request.nextUrl.pathname)) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.redirect(new URL(redirectPath, request.url))
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 인증 API 통과 (login, logout, refresh 등)
  if (pathname.startsWith(AUTH_API_PREFIX)) {
    return NextResponse.next()
  }

  // 공개 경로 처리: 로그인된 사용자는 보드로 이동
  if (PUBLIC_PATHS.includes(pathname)) {
    const accessToken = request.cookies.get(ACCESS_COOKIE)?.value
    const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value

    // 액세스 토큰 유효 → 보드로
    if (accessToken) {
      try {
        await verifyAccess(accessToken)
        return NextResponse.redirect(new URL(APP_PATHS.BOARD.ROOT, request.url))
      } catch {
        // 만료된 경우 리프레시 토큰 확인
      }
    }
    // 리프레시 토큰 유효 → 보드로
    if (refreshToken) {
      try {
        await jwtVerify(refreshToken, refreshSecret())
        return NextResponse.redirect(new URL(APP_PATHS.BOARD.ROOT, request.url))
      } catch {
        // 리프레시도 만료 → 공개 페이지 유지
      }
    }
    return NextResponse.next()
  }

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value

  // 토큰이 전혀 없음 → 401 (로그인 필요)
  if (!accessToken && !refreshToken) {
    logger.auth({ event: 'UNAUTHORIZED', path: pathname, reason: 'no token' })
    return unauthorized(request, APP_PATHS.LOGIN_REQUIRED)
  }

  // 액세스 토큰 검증
  if (accessToken) {
    try {
      const { role, username } = await verifyAccess(accessToken)
      // 역할 부족 → 403 (권한없음)
      if (!hasRoleAccess(pathname, role)) {
        logger.auth({ event: 'FORBIDDEN', username, path: pathname })
        return unauthorized(request, APP_PATHS.UNAUTHORIZED)
      }
      return NextResponse.next()
    } catch {
      // 만료 → 리프레시 시도로 fallthrough
    }
  }

  // 리프레시 토큰도 없음 → 401
  if (!refreshToken) {
    logger.auth({ event: 'UNAUTHORIZED', path: pathname, reason: 'no refresh token' })
    return unauthorized(request, APP_PATHS.LOGIN_REQUIRED)
  }

  // 리프레시 토큰으로 액세스 토큰 재발급
  try {
    const { newToken, payload } = await rotateAccessToken(refreshToken)

    if (!hasRoleAccess(pathname, payload.role)) {
      logger.auth({ event: 'FORBIDDEN', username: payload.username, path: pathname })
      return unauthorized(request, APP_PATHS.UNAUTHORIZED)
    }

    logger.auth({ event: 'TOKEN_REFRESH', username: payload.username, path: pathname })
    return buildRefreshedResponse(request, newToken)
  } catch {
    // 리프레시 토큰 만료 → 세션 만료 페이지 (모달) 또는 API는 401
    logger.auth({ event: 'SESSION_EXPIRED', path: pathname, reason: 'refresh token expired' })
    return unauthorized(request, APP_PATHS.SESSION_EXPIRED)
  }
}

export const config = {
  // 정적 파일 제외, API 포함 (인증 API는 함수 내부에서 제외 처리)
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
