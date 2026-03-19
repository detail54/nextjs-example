import { authRepository } from '@/server/repositories/auth.repository'
import { signAccessToken, signRefreshToken } from '@/server/lib/jwt'
import { logger } from '@/server/lib/logger'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { type DbUser } from '@/server/db/type'
import { type LoginResult } from './type'
import bcrypt from 'bcryptjs'

// ─── 인증 서비스 ──────────────────────────────────────────────────

export const authService = {
  /** 로그인: 유저 조회 → 비밀번호 검증 → 토큰 발급 */
  async login(username: string, password: string): Promise<LoginResult> {
    const user = authRepository.findByUsername(username) as DbUser | undefined

    if (!user) {
      logger.auth({ event: 'LOGIN_FAIL', username, reason: 'user not found' })
      return { ok: false, message: AUTH_MSG.INVALID_CREDENTIALS, status: 401 }
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      logger.auth({ event: 'LOGIN_FAIL', username, reason: 'invalid password' })
      return { ok: false, message: AUTH_MSG.INVALID_CREDENTIALS, status: 401 }
    }

    const tokenPayload = { userId: user.id, username: user.username, role: user.role }
    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(tokenPayload),
      signRefreshToken(tokenPayload),
    ])

    logger.auth({ event: 'LOGIN_SUCCESS', username: user.username })
    
    return {
      ok: true,
      user: { id: user.id, username: user.username, role: user.role, createdAt: user.createdAt },
      accessToken,
      refreshToken,
    }
  },
}
