import { NextRequest, NextResponse } from 'next/server'
import { authenticate, authenticateAdmin } from '@/server/auth/authenticate'
import { taskService } from '@/server/tasks/task.service'
import { SERVER_TASK_MSG } from '@/server/tasks/taskMsg'
import type { BasicResponse, TaskStatus } from '@/server/core/db/type'

type RouteContext = { params: Promise<{ id: string }> }

// task 이동 (status + priority 업데이트)
export async function PATCH(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

  const { id } = await context.params
  const taskId = Number(id)
  if (isNaN(taskId)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_TASK_MSG.INVALID_TASK_ID },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { status, priority } = body as { status: TaskStatus; priority: number }

  taskService.move({ id: taskId, status, priority })

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}

// task 내용 수정
export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

  const { id } = await context.params
  const taskId = Number(id)
  if (isNaN(taskId)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_TASK_MSG.INVALID_TASK_ID },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { title, description, status, startDate, dueDate, color } = body as {
    title: string
    description?: string
    status?: TaskStatus
    startDate?: string | null
    dueDate?: string | null
    color?: string | null
  }

  const result = taskService.update({ id: taskId, title, description, status, startDate, dueDate, color })
  if (!result.ok) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: result.message },
      { status: result.status },
    )
  }

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}

// 태스크 삭제
export async function DELETE(request: NextRequest, context: RouteContext) {
  const authError = await authenticateAdmin(request)
  if (authError) return authError

  const { id } = await context.params
  const taskId = Number(id)
  if (isNaN(taskId)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_TASK_MSG.INVALID_TASK_ID },
      { status: 400 },
    )
  }

  taskService.delete(taskId)

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}
