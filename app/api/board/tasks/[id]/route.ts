import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/server/lib/authenticate'
import { taskRepository } from '@/server/repositories/task.repository'
import { SERVER_BOARD_MSG } from '@/server/messages/boardMsg'
import type { BasicResponse, TaskStatus } from '@/server/db/type'

type RouteContext = { params: Promise<{ id: string }> }

// task 이동 (status + priority 업데이트)
export async function PATCH(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

  const { id } = await context.params
  const taskId = Number(id)

  if (isNaN(taskId)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_BOARD_MSG.INVALID_TASK_ID },
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
      { success: false, data: null, message: SERVER_BOARD_MSG.INVALID_TASK_ID },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { title, description, status, dueDate } = body as {
    title: string
    description?: string
    status?: TaskStatus
    dueDate?: string | null
  }

  if (!title?.trim()) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_BOARD_MSG.TASK_CONTENT_TITLE_REQUIRED },
      { status: 400 },
    )
  }

  taskRepository.update({ id: taskId, title: title.trim(), description: description?.trim(), status, dueDate })

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}
