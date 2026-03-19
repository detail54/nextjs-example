import { authService } from '@/server/auth/auth.service'
import { type CheckUsernameResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/core/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/core/lib/logger'
import { withLogger } from '@/server/core/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: { username: string } = await request.json()
    const { username } = body

    const { available } = authService.checkUsername(username)

    return NextResponse.json<BasicResponse<CheckUsernameResponse>>({
      success: true,
      data: { available },
    })
  } catch (err) {
    logger.error('POST /api/auth/check-username', err)
    return NextResponse.json<BasicResponse<CheckUsernameResponse>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
