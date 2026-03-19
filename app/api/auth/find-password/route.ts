import { authService } from '@/server/auth/auth.service'
import { type FindPasswordRequest, type FindPasswordResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/core/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/core/lib/logger'
import { withLogger } from '@/server/core/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: FindPasswordRequest = await request.json()
    const { username, email } = body

    const result = authService.findPassword(username, email)
    if (!result.ok) {
      return NextResponse.json<BasicResponse<FindPasswordResponse>>(
        { success: false, data: null as never, message: result.message },
        { status: result.status },
      )
    }

    return NextResponse.json<BasicResponse<FindPasswordResponse>>({
      success: true,
      data: { valid: true },
    })
  } catch (err) {
    logger.error('POST /api/auth/find-password', err)
    return NextResponse.json<BasicResponse<FindPasswordResponse>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
