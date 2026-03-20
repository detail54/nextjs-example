import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { userService } from '@/server/users/user.service'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import { USER_MSG } from '@/server/users/userMsg'
import type { BasicResponse, UserRole } from '@/server/core/db/type'

// 사용자 역할 변경 (어드민 전용)
export const PATCH = withAuth(
  async (request: NextRequest) => {
    // URL 세그먼트에서 id 추출
    const segments = request.nextUrl.pathname.split('/')
    const userId = Number(segments[segments.indexOf('users') + 1])
    if (isNaN(userId)) {
      return NextResponse.json<BasicResponse<never>>(
        { success: false, data: null as never, message: USER_MSG.NOT_FOUND },
        { status: HTTP_STATUS.BAD_REQUEST },
      )
    }

    const body = await request.json()
    const role = body.role as UserRole
    if (role !== 'USER' && role !== 'ADMIN') {
      return NextResponse.json<BasicResponse<never>>(
        { success: false, data: null as never, message: USER_MSG.INVALID_ROLE },
        { status: HTTP_STATUS.BAD_REQUEST },
      )
    }

    try {
      userService.updateRole({ id: userId, role })
      return NextResponse.json<BasicResponse<null>>(
        { success: true, data: null, message: USER_MSG.ROLE_UPDATED },
        { status: HTTP_STATUS.OK },
      )
    } catch {
      return NextResponse.json<BasicResponse<never>>(
        { success: false, data: null as never, message: USER_MSG.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      )
    }
  },
  { roles: ['ADMIN'] },
)
