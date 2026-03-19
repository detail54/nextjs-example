import { authRepository } from '@/server/repositories/auth.repository'
import { type RegisterRequest } from '@/features/auth/api/type'
import { type BasicResponse } from '@/server/db/type'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { logger } from '@/server/lib/logger'
import { withLogger } from '@/server/lib/withLogger'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withLogger(async (request: NextRequest) => {
  try {
    const body: RegisterRequest = await request.json()
    const { username, password } = body

    // username 중복 확인
    const existing = authRepository.findByUsername(username)
    if (existing) {
      logger.auth({ event: 'REGISTER_FAIL', username, reason: 'username taken' })
      return NextResponse.json<BasicResponse<null>>(
        { success: false, data: null as never, message: AUTH_MSG.USERNAME_TAKEN },
        { status: 409 },
      )
    }

    // 비밀번호 해싱 후 계정 생성
    const hashedPassword = await bcrypt.hash(password, 10)
    authRepository.create({ username, password: hashedPassword })

    logger.auth({ event: 'REGISTER_SUCCESS', username })
    return NextResponse.json<BasicResponse<null>>({ success: true, data: null as never })
  } catch (err) {
    logger.error('POST /api/auth/register', err)
    return NextResponse.json<BasicResponse<null>>(
      { success: false, data: null as never, message: AUTH_MSG.SERVER_ERROR },
      { status: 500 },
    )
  }
})
