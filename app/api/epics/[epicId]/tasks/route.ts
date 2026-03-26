import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/server/auth/authenticate'
import { taskService } from '@/server/tasks/task.service'
import { SERVER_EPIC_MSG } from '@/server/epics/epic.message'
import type { BasicResponse } from '@/server/core/db/type'

type RouteContext = { params: Promise<{ epicId: string }> }

// 태스크 생성 (todo 컬럼 맨 마지막 priority로 자동 계산)
export async function POST(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

  const { epicId: epicIdStr } = await context.params
  const epicId = Number(epicIdStr)
  if (isNaN(epicId)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_EPIC_MSG.INVALID_EPIC_ID },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { title, startDate, dueDate } = body as {
    title: string
    startDate?: string | null
    dueDate?: string | null
  }

  const result = taskService.create({ epicId, title, startDate, dueDate })
  if (!result.ok) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: result.message },
      { status: result.status },
    )
  }

  return NextResponse.json<BasicResponse<{ id: number }>>(
    { success: true, data: { id: result.id } },
    { status: 201 },
  )
}
