import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/server/lib/authenticate'
import { taskRepository } from '@/server/repositories/task.repository'
import type { BasicResponse } from '@/server/db/type'

type RouteContext = { params: Promise<{ epicId: string }> }

// 태스크 생성 (todo 컬럼 맨 마지막 priority로 자동 계산)
export async function POST(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

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
