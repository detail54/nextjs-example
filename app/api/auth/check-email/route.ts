import { authRepository } from '@/server/repositories/auth.repository'
import { type CheckEmailResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/lib/logger'
import { withLogger } from '@/server/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: { email: string } = await request.json()
    const { email } = body

    // 이메일 존재 여부 확인
    const existing = authRepository.findByEmail(email)
    const available = !existing

    logger.auth({ event: 'CHECK_USERNAME', username: email, reason: available ? 'available' : 'taken' })
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
