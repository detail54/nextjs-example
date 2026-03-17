import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken, ACCESS_TOKEN_COOKIE } from '@/lib/jwt'
import { AuthError, AuthErrorCode } from '@/lib/authError'
import { taskRepository } from '@/features/todos/api/task.repository'
import type { BasicResponse, TaskStatus } from '@/db/type'

// 인증 공통 처리 헬퍼
async function authenticate(request: NextRequest): Promise<NextResponse | null> {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  if (!token) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '인증이 필요합니다.' },
      { status: 401 },
    )
  }
  try {
    await verifyAccessToken(token)
    return null
  } catch (error) {
    if (error instanceof AuthError && error.code === AuthErrorCode.TOKEN_EXPIRED) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: '토큰이 만료되었습니다.' },
        { status: 401 },
      )
    }
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '유효하지 않은 토큰입니다.' },
      { status: 401 },
    )
  }
}

type RouteContext = { params: Promise<{ id: string }> }

// task 이동 (status + priority 업데이트)
export async function PATCH(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

  const { id } = await context.params
  const taskId = Number(id)

  if (isNaN(taskId)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '유효하지 않은 task ID입니다.' },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { status, priority } = body as { status: TaskStatus; priority: number }

  taskRepository.updateMove({ id: taskId, status, priority })

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}

// task 내용 수정 (title + description)
export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

  const { id } = await context.params
  const taskId = Number(id)

  if (isNaN(taskId)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '유효하지 않은 task ID입니다.' },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { title, description } = body as { title: string; description?: string }

  if (!title?.trim()) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '제목을 입력해주세요.' },
      { status: 400 },
    )
  }

  taskRepository.update({ id: taskId, title: title.trim(), description: description?.trim() })

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}
