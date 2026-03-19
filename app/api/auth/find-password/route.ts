import { authRepository } from '@/server/repositories/auth.repository'
import { type FindPasswordRequest, type FindPasswordResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/lib/logger'
import { withLogger } from '@/server/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: FindPasswordRequest = await request.json()
    const { username, email } = body

    // 아이디 + 이메일 동시 일치 검증
    const user = authRepository.findByUsernameAndEmail(username, email)
    if (!user) {
      logger.auth({ event: 'UNAUTHORIZED', username, reason: 'username or email not matched' })
      return NextResponse.json<BasicResponse<FindPasswordResponse>>(
        { success: false, data: null as never, message: AUTH_MSG.FIND_PASSWORD_NOT_FOUND },
        { status: 404 },
      )
    }

    logger.auth({ event: 'LOGIN_SUCCESS', username })
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
