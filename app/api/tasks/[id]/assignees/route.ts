import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/server/auth/authenticate'
import { taskService } from '@/server/tasks/task.service'
import type { BasicResponse } from '@/server/core/db/type'

type RouteContext = { params: Promise<{ id: string }> }

// 태스크 담당자 교체
export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

  const { id } = await context.params
  const taskId = Number(id)

  const { userIds } = (await request.json()) as { userIds: number[] }

  taskService.updateAssignees(taskId, userIds ?? [])

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}
