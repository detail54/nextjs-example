import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/withAuth'
import { epicRepository } from '@/features/todos/api/epic.repository'
import { taskRepository } from '@/features/todos/api/task.repository'
import type { BasicResponse } from '@/db/type'

type Params = { params: Promise<{ epicId: string }> }

// 에픽 수정
export const PUT = withAuth(async (request: NextRequest, context: Params) => {
  const { epicId } = await context.params
  const id = Number(epicId)
  if (isNaN(id)) {
    return NextResponse.json<BasicResponse<never>>(
      { success: false, data: null as never, message: '잘못된 에픽 ID입니다.' },
      { status: 400 },
    )
  }

  const body = await request.json()
  const { title, description } = body as { title: string; description?: string }

  if (!title?.trim()) {
    return NextResponse.json<BasicResponse<never>>(
      { success: false, data: null as never, message: '에픽명을 입력해주세요.' },
      { status: 400 },
    )
  }

  epicRepository.update({ id, title: title.trim(), description: description?.trim() })

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
})

// 에픽 삭제 (하위 태스크 포함)
export const DELETE = withAuth(async (_request: NextRequest, context: Params) => {
  const { epicId } = await context.params
  const id = Number(epicId)
  if (isNaN(id)) {
    return NextResponse.json<BasicResponse<never>>(
      { success: false, data: null as never, message: '잘못된 에픽 ID입니다.' },
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
})
