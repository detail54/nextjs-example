import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { noticeService } from '@/server/notices/notice.service'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import { NOTICE_MSG } from '@/server/notices/noticeMsg'
import type { BasicResponse, PageResponse } from '@/server/core/db/type'
import type { NoticeManageItem } from '@/server/notices/type'
import type { NoticeSortBy, NoticeSortOrder } from '@/features/notice/api/type'

// 전체 공지사항 목록 조회 (관리자)
export const GET = withAuth(
  async (request: NextRequest) => {
    const { searchParams } = request.nextUrl
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const pageSize = Math.max(1, Number(searchParams.get('pageSize') ?? 10))
    const sortBy = (searchParams.get('sortBy') ?? 'createdAt') as NoticeSortBy
    const sortOrder = (searchParams.get('sortOrder') ?? 'desc') as NoticeSortOrder

    const { data, total, totalPages } = noticeService.getAll(page, pageSize, sortBy, sortOrder)

    return NextResponse.json<PageResponse<NoticeManageItem>>(
      { success: true, data, pagination: { page, pageSize, total, totalPages } },
      { status: HTTP_STATUS.OK },
    )
  },
  { roles: ['ADMIN'] },
)

// 공지사항 생성 (관리자)
export const POST = withAuth(
  async (request: NextRequest, { user }) => {
    const { title, content, isPinned, isPublished } = await request.json()

    const result = noticeService.create({
      authorId: user.userId,
      title,
      content,
      isPinned: !!isPinned,
      isPublished: !!isPublished,
    })

    if (!result.ok) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: result.message },
        { status: result.status },
      )
    }

    return NextResponse.json<BasicResponse<null>>(
      { success: true, data: null, message: NOTICE_MSG.CREATED },
      { status: HTTP_STATUS.CREATED },
    )
  },
  { roles: ['ADMIN'] },
)
