import { authRepository } from '@/features/auth/api/auth.repository'
import { type DbUser } from '@/db/type'
import { type LoginRequest } from '@/features/auth/api/type'
import { signJwt, AUTH_COOKIE } from '@/lib/jwt'
import { AUTH_MSG } from '@/context/authMsg'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()
    const { username, password } = body

    // DB에서 유저 조회
    const user = authRepository.findByUsername(username) as DbUser | undefined
    if (!user) {
      return NextResponse.json(
        { message: AUTH_MSG.INVALID_CREDENTIALS },
        { status: 401 },
      )
    }

    // 비밀번호 검증
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { message: AUTH_MSG.INVALID_CREDENTIALS },
        { status: 401 },
      )
    }

    // JWT 발급
    const token = await signJwt({
      userId: user.id,
      username: user.username,
      role: user.role,
    })

    const response = NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.created_at,
      },
    })

    // HttpOnly 쿠키에 토큰 저장 (XSS 방지)
    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Number(process.env.COOKIE_MAX_AGE),
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ message: AUTH_MSG.SERVER_ERROR }, { status: 500 })
  }
}
