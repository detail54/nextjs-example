import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/lib/withAuth'
import { epicRepository } from '@/server/repositories/epic.repository'
import type { BasicResponse } from '@/server/db/type'

// 에픽 생성
export const POST = withAuth(async (request: NextRequest) => {
  const body = await request.json()
  const { title, description } = body as { title: string; description?: string }

  if (!title?.trim()) {
    return NextResponse.json<BasicResponse<never>>(
      { success: false, data: null as never, message: '에픽명을 입력해주세요.' },
      { status: 400 },
    )
  }

  const id = epicRepository.create({ title: title.trim(), description: description?.trim() })

  return NextResponse.json<BasicResponse<{ id: number }>>(
    { success: true, data: { id: Number(id) } },
    { status: 201 },
  )
})
