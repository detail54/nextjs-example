import { authRepository } from '@/server/repositories/auth.repository'
import { type ResetPasswordRequest } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/lib/logger'
import { withLogger } from '@/server/lib/withLogger'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: ResetPasswordRequest = await request.json()
    const { username, email, password } = body

    // 재설정 전 아이디 + 이메일 재검증
    const user = authRepository.findByUsernameAndEmail(username, email)
    if (!user) {
      logger.auth({ event: 'UNAUTHORIZED', username, reason: 'username or email not matched' })
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null as never, message: AUTH_MSG.FIND_PASSWORD_NOT_FOUND },
        { status: 404 },
      )
    }

    // 비밀번호 해싱 후 업데이트
    const hashedPassword = await bcrypt.hash(password, 10)
    authRepository.updatePassword({ userId: user.id, password: hashedPassword })

    logger.auth({ event: 'LOGIN_SUCCESS', username })
    return NextResponse.json<BasicResponse<null>>({ success: true, data: null as never })
  } catch (err) {
    logger.error('POST /api/auth/reset-password', err)
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
