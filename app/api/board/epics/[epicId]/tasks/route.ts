import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessToken, ACCESS_TOKEN_COOKIE } from '@/lib/jwt'
import { AuthError, AuthErrorCode } from '@/lib/authError'
import { taskRepository } from '@/features/board/api/task.repository'
import type { BasicResponse } from '@/db/type'

type RouteContext = { params: Promise<{ epicId: string }> }

// 태스크 생성 (todo 컬럼 맨 마지막 priority로 자동 계산)
export async function POST(request: NextRequest, context: RouteContext) {
  // 인증 검사
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value
  if (!token) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '인증이 필요합니다.' },
      { status: 401 },
    )
  }

  try {
    await verifyAccessToken(token)
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

  const { epicId: epicIdStr } = await context.params
  const epicId = Number(epicIdStr)

  if (isNaN(epicId)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '잘못된 에픽 ID입니다.' },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { title } = body as { title: string }

  if (!title?.trim()) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: '태스크 제목을 입력해주세요.' },
      { status: 400 },
    )
  }

  // todo 상태 tasks 중 가장 높은 priority 조회 후 맨 마지막에 추가
  const allTasks = taskRepository.getByEpicIdSorted(epicId)
  const todoTasks = allTasks.filter((t) => t.status === 'todo')
  const maxPriority = todoTasks.length > 0 ? Math.max(...todoTasks.map((t) => t.priority)) : 0
  const newPriority = maxPriority + 1000

  const id = taskRepository.createWithPriority({ epicId, title: title.trim(), priority: newPriority })

  return NextResponse.json<BasicResponse<{ id: number }>>(
    { success: true, data: { id: Number(id) } },
    { status: 201 },
  )
}
