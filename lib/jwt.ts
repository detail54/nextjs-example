import { SignJWT, jwtVerify, errors as joseErrors } from 'jose'
import { type UserRole } from '@/db/type'
import { AuthError, AuthErrorCode } from './authError'

// JWT 서명에 사용할 시크릿 키
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// JWT 페이로드 타입
export type JwtUserPayload = {
  userId: number
  username: string
  role: UserRole
}

// JWT 토큰 발급
export async function signJwt(payload: JwtUserPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: process.env.JWT_ALGORITHM! })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN!)
    .sign(SECRET)
}

// JWT 토큰 검증 - 만료/유효하지 않음 구분해서 AuthError throw
export async function verifyJwt(token: string): Promise<JwtUserPayload> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as JwtUserPayload
  } catch (error) {
    if (error instanceof joseErrors.JWTExpired) {
      throw new AuthError(AuthErrorCode.TOKEN_EXPIRED)
    }
    throw new AuthError(AuthErrorCode.INVALID_TOKEN)
  }
}

// 쿠키 이름 상수
export const AUTH_COOKIE = process.env.AUTH_COOKIE_NAME!
