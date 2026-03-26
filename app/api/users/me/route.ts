import { NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { userService } from '@/server/users/user.service'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import type { BasicResponse } from '@/server/core/db/type'
import type { UserProfile } from '@/server/users/type'

// 내 프로필 조회
export const GET = withAuth(async (_, { user }) => {
  const result = userService.getProfile(user.userId)

  if (!result.ok) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: result.message },
      { status: result.status },
    )
  }

  return NextResponse.json<BasicResponse<UserProfile>>(
    { success: true, data: result.profile },
    { status: HTTP_STATUS.OK },
  )
})
