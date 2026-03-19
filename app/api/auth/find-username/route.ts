import { authRepository } from '@/server/repositories/auth.repository'
import { type FindUsernameRequest, type FindUsernameResponse } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/lib/logger'
import { withLogger } from '@/server/lib/withLogger'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: FindUsernameRequest = await request.json()
    const { email } = body

    // 이메일로 유저 조회
    const user = authRepository.findByEmail(email)
    if (!user) {
      logger.auth({ event: 'UNAUTHORIZED', reason: 'email not found' })
      return NextResponse.json<BasicResponse<FindUsernameResponse>>(
        { success: false, data: null as never, message: AUTH_MSG.FIND_USERNAME_NOT_FOUND },
        { status: 404 },
      )
    }

    logger.auth({ event: 'LOGIN_SUCCESS', username: user.username })
    return NextResponse.json<BasicResponse<FindUsernameResponse>>({
      success: true,
      data: { username: user.username },
    })
  } catch (err) {
    logger.error('POST /api/auth/find-username', err)
    return NextResponse.json<BasicResponse<FindUsernameResponse>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
