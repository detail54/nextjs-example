import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { epicService } from '@/server/epics/epic.service'
import type { BasicResponse, ListResponse } from '@/server/core/db/type'
import type { EpicWithTasks } from '@/features/common/api/type'

// 에픽 전체 목록 조회 (태스크 포함)
export const GET = withAuth(async (_request: NextRequest) => {
  const data = epicService.getAll()
  return NextResponse.json<ListResponse<EpicWithTasks>>({ success: true, data })
})

// 에픽 생성 (관리자 전용)
export const POST = withAuth(
  async (request: NextRequest) => {
    const body = await request.json()

    const result = epicService.create(body)
    if (!result.ok) {
      return NextResponse.json<BasicResponse<never>>(
        { success: false, data: null as never, message: result.message },
        { status: result.status },
      )
    }

    return NextResponse.json<BasicResponse<{ id: number }>>(
      { success: true, data: { id: result.id } },
      { status: 201 },
    )
  },
  { roles: ['ADMIN'] },
)
