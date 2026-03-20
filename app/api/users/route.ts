import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { userService } from '@/server/users/user.service'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import type { PageResponse } from '@/server/core/db/type'
import type { UserListItem, UserSortBy, UserSortOrder } from '@/server/users/type'

// 사용자 목록 조회 (어드민 전용)
export const GET = withAuth(
  async (request: NextRequest) => {
    const { searchParams } = request.nextUrl
    const page = Math.max(1, Number(searchParams.get('page') ?? 1))
    const pageSize = Math.max(1, Number(searchParams.get('pageSize') ?? 10))
    const sortBy = (searchParams.get('sortBy') ?? 'createdAt') as UserSortBy
    const sortOrder = (searchParams.get('sortOrder') ?? 'desc') as UserSortOrder

    const { data, total, totalPages } = userService.getList({ page, pageSize, sortBy, sortOrder })

    return NextResponse.json<PageResponse<UserListItem>>(
      { success: true, data, pagination: { page, pageSize, total, totalPages } },
      { status: HTTP_STATUS.OK },
    )
  },
  { roles: ['ADMIN'] },
)
