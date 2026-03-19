import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/server/lib/authenticate'
import { epicRepository } from '@/server/repositories/epic.repository'
import { taskRepository } from '@/server/repositories/task.repository'
import { SERVER_BOARD_MSG } from '@/server/messages/boardMsg'
import type { BasicResponse, EpicStatus } from '@/server/db/type'

type RouteContext = { params: Promise<{ epicId: string }> }

// 에픽 수정
export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = await authenticateAdmin(request)
  if (authError) return authError

  const { epicId } = await context.params
  const id = Number(epicId)
  if (isNaN(id)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_BOARD_MSG.INVALID_EPIC_ID },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { title, description, status, startDate, dueDate, color } = body as {
    title: string
    description?: string
    status?: EpicStatus
    startDate?: string | null
    dueDate?: string | null
    color?: string | null
  }

  if (!title?.trim()) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_BOARD_MSG.EPIC_TITLE_REQUIRED },
      { status: 400 },
    )
  }

  epicRepository.update({
    id,
    title: title.trim(),
    description: description?.trim(),
    status,
    startDate,
    dueDate,
    color,
  })

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}

// 에픽 삭제 (하위 태스크 포함)
export async function DELETE(request: NextRequest, context: RouteContext) {
  const authError = await authenticateAdmin(request)
  if (authError) return authError

  const { epicId } = await context.params
  const id = Number(epicId)
  if (isNaN(id)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_BOARD_MSG.INVALID_EPIC_ID },
      { status: 400 },
    )
  }

  // FK 미적용 환경이므로 하위 태스크 먼저 삭제
  const epicTasks = taskRepository.getByEpicId(id)
  for (const task of epicTasks) {
    taskRepository.delete(task.id)
  }
  epicRepository.delete(id)

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}
