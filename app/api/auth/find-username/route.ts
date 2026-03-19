import { authService } from '@/server/auth/auth.service'
import { type FindUsernameRequest, type FindUsernameResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/core/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/core/lib/logger'
import { withLogger } from '@/server/core/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: FindUsernameRequest = await request.json()
    const { email } = body

    const result = authService.findUsername(email)
    if (!result.ok) {
      return NextResponse.json<BasicResponse<FindUsernameResponse>>(
        { success: false, data: null as never, message: result.message },
        { status: result.status },
      )
    }

    return NextResponse.json<BasicResponse<FindUsernameResponse>>({
      success: true,
      data: { username: result.username },
    })
  } catch (err) {
    logger.error('POST /api/auth/find-username', err)
    return NextResponse.json<BasicResponse<FindUsernameResponse>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
