import { AUTH_COOKIE } from '@/lib/jwt'
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })

  // auth 쿠키 제거
  response.cookies.delete(AUTH_COOKIE)

  return response
}
