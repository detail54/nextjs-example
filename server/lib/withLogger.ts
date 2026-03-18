import { NextRequest, NextResponse } from 'next/server'
import { logger } from './logger'

// 유저 정보 제공 함수 타입 (withAuth 등에서 주입)
type UserProvider = (
  request: NextRequest,
) => Promise<{ username: string; role: string } | undefined>

// GET/DELETE 제외한 요청 바디를 원본 스트림 유지하며 읽기
async function readBody(request: NextRequest): Promise<unknown> {
  if (request.method === 'GET' || request.method === 'DELETE') return undefined
  try {
    return await request.clone().json()
  } catch {
    return undefined
  }
}

// API 요청/응답 로깅 래퍼 (선택적으로 유저 정보 포함)
export function withLogger(
  handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>,
  getUser?: UserProvider,
) {
  return async (request: NextRequest, context?: unknown): Promise<NextResponse> => {
    const start = Date.now()

    const [body, user] = await Promise.all([
      readBody(request),
      getUser?.(request).catch(() => undefined),
    ])

    const response = await handler(request, context)

    logger.api({
      method: request.method,
      path: request.nextUrl.pathname,
      status: response.status,
      duration: Date.now() - start,
      body,
      user,
    })

    return response
  }
}
