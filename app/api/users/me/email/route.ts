import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/server/auth/withAuth'
import { userService } from '@/server/users/user.service'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import { USER_MSG } from '@/server/users/userMsg'
import type { BasicResponse } from '@/server/core/db/type'

// 내 이메일 변경
export const PUT = withAuth(async (request: NextRequest, { user }) => {
  const { email, currentPassword } = await request.json()

  if (!email || !currentPassword) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: USER_MSG.NOT_FOUND },
      { status: HTTP_STATUS.BAD_REQUEST },
    )
  }

  const result = await userService.updateEmail({
    userId: user.userId,
    username: user.username,
    email,
    currentPassword,
  })

  if (!result.ok) {
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null, message: result.message },
      { status: result.status },
    )
  }

  return NextResponse.json<BasicResponse<null>>(
    { success: true, data: null, message: USER_MSG.EMAIL_UPDATED },
    { status: HTTP_STATUS.OK },
  )
})
