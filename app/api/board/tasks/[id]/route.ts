import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/authenticate'
import { taskRepository } from '@/features/board/api/task.repository'
import type { BasicResponse, TaskStatus } from '@/db/type'

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
