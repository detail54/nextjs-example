import { authService } from '@/server/auth/auth.service'
import { type CheckEmailResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/core/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/core/lib/logger'
import { withLogger } from '@/server/core/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: { email: string } = await request.json()
    const { email } = body

    const { available } = authService.checkEmail(email)

    return NextResponse.json<BasicResponse<CheckEmailResponse>>({
      success: true,
      data: { available },
    })
  } catch (err) {
    logger.error('POST /api/auth/check-email', err)
    return NextResponse.json<BasicResponse<CheckEmailResponse>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
