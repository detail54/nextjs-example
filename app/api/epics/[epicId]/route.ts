import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/server/auth/authenticate'
import { epicService } from '@/server/epics/epic.service'
import { SERVER_EPIC_MSG } from '@/server/epics/epic.message'
import type { BasicResponse, EpicStatus } from '@/server/core/db/type'

type RouteContext = { params: Promise<{ epicId: string }> }

// 에픽 수정
export async function PUT(request: NextRequest, context: RouteContext) {
  const authError = await authenticateAdmin(request)
  if (authError) return authError

  const { epicId } = await context.params
  const id = Number(epicId)
  if (isNaN(id)) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: SERVER_EPIC_MSG.INVALID_EPIC_ID },
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

  const result = epicService.update({ id, title, description, status, startDate, dueDate, color })
  if (!result.ok) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: result.message },
      { status: result.status },
    )
  }

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
      { success: false, data: null, message: SERVER_EPIC_MSG.INVALID_EPIC_ID },
      { status: 400 },
    )
  }

  epicService.delete(id)

  return NextResponse.json<BasicResponse<null>>({ success: true, data: null })
}
