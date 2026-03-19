import { authService } from '@/server/auth/auth.service'
import { type ResetPasswordRequest } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/core/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/core/lib/logger'
import { withLogger } from '@/server/core/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: ResetPasswordRequest = await request.json()
    const { username, email, password } = body

    const result = await authService.resetPassword(username, email, password)
    if (!result.ok) {
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null as never, message: result.message },
        { status: result.status },
      )
    }

    return NextResponse.json<BasicResponse<null>>({ success: true, data: null as never })
  } catch (err) {
    logger.error('POST /api/auth/reset-password', err)
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
