import { authRepository } from '@/server/repositories/auth.repository'
import { type CheckUsernameResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/lib/logger'
import { withLogger } from '@/server/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: { username: string } = await request.json()
    const { username } = body

    // username 존재 여부 확인
    const existing = authRepository.findByUsername(username)
    const available = !existing

    logger.auth({ event: 'CHECK_USERNAME', username, reason: available ? 'available' : 'taken' })
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
