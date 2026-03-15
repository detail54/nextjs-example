import { AUTH_COOKIE } from '@/lib/jwt'
import { type BasicResponse } from '@/db/type'
import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse<BasicResponse<null>>> {
  const response = NextResponse.json<BasicResponse<null>>({ success: true, data: null })

  // auth 쿠키 제거
  response.cookies.delete(AUTH_COOKIE)

  return response
}
