import { SignJWT, jwtVerify, errors as joseErrors } from 'jose'
import { type UserRole } from '@/server/core/db/type'
import { AuthError, AuthErrorCode } from './authError'

// 액세스 토큰: 15분 (짧은 수명으로 보안 강화)
const ACCESS_TOKEN_EXPIRES_IN = '15m'
// 리프레시 토큰: 7일 (자동 로그인 유지)
const REFRESH_TOKEN_EXPIRES_IN = '7d'

const ACCESS_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

// JWT 페이로드 타입
export type JwtUserPayload = {
  userId: number
  username: string
  role: UserRole
}

// 액세스 토큰 발급 (15분)
export async function signAccessToken(payload: JwtUserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
    .sign(ACCESS_SECRET)
}

// 리프레시 토큰 발급 (7일)
export async function signRefreshToken(payload: JwtUserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRES_IN)
    .sign(REFRESH_SECRET)
}

// 액세스 토큰 검증
export async function verifyAccessToken(token: string): Promise<JwtUserPayload> {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET)
    return payload as unknown as JwtUserPayload
  } catch (error) {
    if (error instanceof joseErrors.JWTExpired) {
      throw new AuthError(AuthErrorCode.TOKEN_EXPIRED)
    }
    throw new AuthError(AuthErrorCode.INVALID_TOKEN)
  }
}

// 리프레시 토큰 검증
export async function verifyRefreshToken(token: string): Promise<JwtUserPayload> {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET)
    return payload as unknown as JwtUserPayload
  } catch (error) {
    if (error instanceof joseErrors.JWTExpired) {
      throw new AuthError(AuthErrorCode.TOKEN_EXPIRED)
    }
    throw new AuthError(AuthErrorCode.INVALID_TOKEN)
  }
}

// 쿠키 이름 상수
export const ACCESS_TOKEN_COOKIE = process.env.ACCESS_TOKEN_COOKIE_NAME!
export const REFRESH_TOKEN_COOKIE = process.env.REFRESH_TOKEN_COOKIE_NAME!

// 쿠키 maxAge 상수 (초)
export const ACCESS_TOKEN_MAX_AGE = 15 * 60 // 15분
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 // 7일
