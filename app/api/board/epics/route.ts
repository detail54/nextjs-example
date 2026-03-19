import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/lib/withAuth'
import { epicRepository } from '@/server/repositories/epic.repository'
import { SERVER_BOARD_MSG } from '@/server/messages/boardMsg'
import type { BasicResponse } from '@/server/db/type'

// 에픽 생성 (관리자 전용)
export const POST = withAuth(
  async (request: NextRequest) => {
    const body = await request.json()
    const { title, description, status, startDate, dueDate, color } = body as {
      title: string
      description?: string
      status?: string
      startDate?: string | null
      dueDate?: string | null
      color?: string | null
    }

    if (!title?.trim()) {
      return NextResponse.json<BasicResponse<never>>(
        { success: false, data: null as never, message: SERVER_BOARD_MSG.EPIC_TITLE_REQUIRED },
        { status: 400 },
      )
    }

    const id = epicRepository.create({
      title: title.trim(),
      description: description?.trim(),
      status: status as Parameters<typeof epicRepository.create>[0]['status'],
      startDate: startDate ?? null,
      dueDate: dueDate ?? null,
      color: color ?? null,
    })

    return NextResponse.json<BasicResponse<{ id: number }>>(
      { success: true, data: { id: Number(id) } },
      { status: 201 },
    )
  },
  { roles: ['ADMIN'] },
)
