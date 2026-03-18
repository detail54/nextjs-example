import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/lib/withAuth'
import { noticeRepository } from '@/server/repositories/notice.repository'
import type { PageResponse } from '@/server/db/type'
import type { NoticeItem } from '@/features/notice/api/type'

// 게시된 공지사항 페이지 목록 조회
export const GET = withAuth(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const pageSize = Math.max(1, Number(searchParams.get('pageSize') ?? 10))

  const total = noticeRepository.countPublished()
  const totalPages = Math.ceil(total / pageSize)
  const data = noticeRepository.getPublished(page, pageSize)

  return NextResponse.json<PageResponse<NoticeItem>>({
    success: true,
    data,
    pagination: { page, pageSize, total, totalPages },
  })
})
