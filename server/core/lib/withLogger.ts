import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { logger } from './logger'

type UserProvider = (
  request: NextRequest,
) => Promise<{ username: string; role: string } | undefined>

async function readBody(request: NextRequest): Promise<unknown> {
  if (request.method === 'GET' || request.method === 'DELETE') return undefined
  try {
    return await request.clone().json()
  } catch {
    return undefined
  }
}

async function readResponseBody(response: NextResponse): Promise<unknown> {
  try {
    return await response.clone().json()
  } catch {
    return undefined
  }
}

// 액세스 토큰에서 username, role만 추출 (비밀번호 등 민감 정보 없음)
async function getUserFromToken(
  request: NextRequest,
): Promise<{ username: string; role: string } | undefined> {
  const cookieName = process.env.ACCESS_TOKEN_COOKIE_NAME
  const secret = process.env.ACCESS_TOKEN_SECRET
  if (!cookieName || !secret) return undefined

  const token = request.cookies.get(cookieName)?.value
  if (!token) return undefined

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    const { username, role } = payload as { username?: string; role?: string }
    if (!username || !role) return undefined
    return { username, role }
  } catch {
    return undefined
  }
}

export function withLogger(
  handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>,
  getUser?: UserProvider,
) {
  return async (request: NextRequest, context?: unknown): Promise<NextResponse> => {
    const start = Date.now()

    const [reqBody, user] = await Promise.all([
      readBody(request),
      (getUser ?? getUserFromToken)(request).catch(() => undefined),
    ])

    const response = await handler(request, context)
    const resBody = await readResponseBody(response)

    logger.api({
      method: request.method,
      path: request.nextUrl.pathname,
      status: response.status,
      duration: Date.now() - start,
      user,
      reqBody,
      resBody,
    })

    return response
  }
}
