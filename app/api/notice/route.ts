import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { noticeService } from '@/server/notices/notice.service'
import type { PageResponse } from '@/server/core/db/type'
import type { NoticeItem, NoticeSortBy, NoticeSortOrder } from '@/features/notice/api/type'

// 게시된 공지사항 페이지 목록 조회
export const GET = withAuth(async (request: NextRequest) => {
  const { searchParams } = request.nextUrl
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const pageSize = Math.max(1, Number(searchParams.get('pageSize') ?? 10))
  const sortBy = (searchParams.get('sortBy') ?? 'createdAt') as NoticeSortBy
  const sortOrder = (searchParams.get('sortOrder') ?? 'desc') as NoticeSortOrder

  const { data, total, totalPages } = noticeService.getPublished({ page, pageSize, sortBy, sortOrder })

  return NextResponse.json<PageResponse<NoticeItem>>({
    success: true,
    data,
    pagination: { page, pageSize, total, totalPages },
  })
})
