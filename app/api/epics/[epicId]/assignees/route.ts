import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/server/auth/authenticate'
import { epicService } from '@/server/epics/epic.service'
import type { BasicResponse } from '@/server/core/db/type'

type RouteContext = { params: Promise<{ epicId: string }> }

// 에픽 담당자 교체
export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = await authenticate(request)
  if (authError) return authError

  const { epicId } = await context.params
  const id = Number(epicId)

  const { userIds } = (await request.json()) as { userIds: number[] }

  epicService.updateAssignees(id, userIds ?? [])

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}
