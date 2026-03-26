import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { noticeService } from '@/server/notices/notice.service'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import { NOTICE_MSG } from '@/server/notices/noticeMsg'
import type { BasicResponse } from '@/server/core/db/type'
import type { NoticeManageDetail } from '@/server/notices/type'

// URL 세그먼트에서 notice id 추출
function getNoticeId(request: NextRequest): number {
  const segments = request.nextUrl.pathname.split('/')
  return Number(segments[segments.indexOf('notice-manage') + 1])
}

// 공지사항 단건 조회 (관리자)
export const GET = withAuth(
  async (request: NextRequest) => {
    const id = getNoticeId(request)
    const result = noticeService.getById(id)

    if (!result.ok) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: result.message },
        { status: result.status },
      )
    }

    return NextResponse.json<BasicResponse<NoticeManageDetail>>(
      { success: true, data: result.notice },
      { status: HTTP_STATUS.OK },
    )
  },
  { roles: ['ADMIN'] },
)

// 공지사항 수정 (관리자)
export const PUT = withAuth(
  async (request: NextRequest) => {
    const id = getNoticeId(request)
    const { title, content, isPinned, isPublished } = await request.json()

    const result = noticeService.update(id, {
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
      { success: true, data: null, message: NOTICE_MSG.UPDATED },
      { status: HTTP_STATUS.OK },
    )
  },
  { roles: ['ADMIN'] },
)

// 공지사항 삭제 (관리자)
export const DELETE = withAuth(
  async (request: NextRequest) => {
    const id = getNoticeId(request)
    const result = noticeService.delete(id)

    if (!result.ok) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null, message: result.message },
        { status: result.status },
      )
    }

    return NextResponse.json<BasicResponse<null>>(
      { success: true, data: null, message: NOTICE_MSG.DELETED },
      { status: HTTP_STATUS.OK },
    )
  },
  { roles: ['ADMIN'] },
)
