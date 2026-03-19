import { authRepository } from './auth.repository'
import { verifyRefreshToken, signAccessToken, signRefreshToken } from './jwt'
import { AuthError } from './authError'
import { logger } from '@/server/core/lib/logger'
import { AUTH_MSG } from '@/context/messages/authMsg'
import { SERVER_AUTH_MSG } from './authMsg'
import { HTTP_STATUS } from '@/server/core/messages/httpStatus'
import { type DbUser } from '@/server/core/db/type'
import { type ServiceResult } from '@/server/core/type'
import { type LoginResult, type RefreshTokenResult, type FindUsernameResult } from './type'
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

  /** 회원가입: username/email 중복 확인 → 비밀번호 해싱 → 계정 생성 */
  async register(username: string, email: string, password: string): Promise<ServiceResult> {
    const existingByUsername = authRepository.findByUsername(username)
    if (existingByUsername) {
      logger.auth({ event: 'REGISTER_FAIL', username, reason: 'username taken' })
      return { ok: false, message: AUTH_MSG.USERNAME_TAKEN, status: 409 }
    }

    const existingByEmail = authRepository.findByEmail(email)
    if (existingByEmail) {
      logger.auth({ event: 'REGISTER_FAIL', username, reason: 'email taken' })
      return { ok: false, message: AUTH_MSG.EMAIL_TAKEN, status: 409 }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    authRepository.create({ username, email, password: hashedPassword })

    logger.auth({ event: 'REGISTER_SUCCESS', username })
    return { ok: true }
  },

  /** username 사용 가능 여부 확인 */
  checkUsername(username: string): { available: boolean } {
    const existing = authRepository.findByUsername(username)
    const available = !existing
    logger.auth({ event: 'CHECK_USERNAME', username, reason: available ? 'available' : 'taken' })
    return { available }
  },

  /** email 사용 가능 여부 확인 */
  checkEmail(email: string): { available: boolean } {
    const existing = authRepository.findByEmail(email)
    const available = !existing
    logger.auth({ event: 'CHECK_USERNAME', username: email, reason: available ? 'available' : 'taken' })
    return { available }
  },

  /** 아이디 찾기: 이메일로 username 조회 */
  findUsername(email: string): FindUsernameResult {
    const user = authRepository.findByEmail(email)
    if (!user) {
      logger.auth({ event: 'UNAUTHORIZED', reason: 'email not found' })
      return { ok: false, message: AUTH_MSG.FIND_USERNAME_NOT_FOUND, status: 404 }
    }

    logger.auth({ event: 'LOGIN_SUCCESS', username: user.username })
    return { ok: true, username: user.username }
  },

  /** 비밀번호 찾기: username + email 일치 검증 */
  findPassword(username: string, email: string): ServiceResult {
    const user = authRepository.findByUsernameAndEmail(username, email)
    if (!user) {
      logger.auth({ event: 'UNAUTHORIZED', username, reason: 'username or email not matched' })
      return { ok: false, message: AUTH_MSG.FIND_PASSWORD_NOT_FOUND, status: 404 }
    }

    logger.auth({ event: 'LOGIN_SUCCESS', username })
    return { ok: true }
  },

  /** 비밀번호 재설정: username + email 재검증 → 비밀번호 해싱 → 업데이트 */
  async resetPassword(username: string, email: string, password: string): Promise<ServiceResult> {
    const user = authRepository.findByUsernameAndEmail(username, email)
    if (!user) {
      logger.auth({ event: 'UNAUTHORIZED', username, reason: 'username or email not matched' })
      return { ok: false, message: AUTH_MSG.FIND_PASSWORD_NOT_FOUND, status: 404 }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    authRepository.updatePassword({ userId: user.id, password: hashedPassword })

    logger.auth({ event: 'LOGIN_SUCCESS', username })
    return { ok: true }
  },

  /** 토큰 갱신: 리프레시 토큰 검증 → 새 액세스 토큰 발급 */
  async refreshToken(token: string): Promise<RefreshTokenResult> {
    const user = await verifyRefreshToken(token).catch((error) => {
      if (error instanceof AuthError) {
        logger.auth({ event: 'SESSION_EXPIRED', reason: 'refresh token expired' })
        return null
      }
      throw error
    })

    if (!user) {
      return { ok: false, message: SERVER_AUTH_MSG.TOKEN_EXPIRED, status: HTTP_STATUS.UNAUTHORIZED }
    }

    const newAccessToken = await signAccessToken({
      userId: user.userId,
      username: user.username,
      role: user.role,
    })

    logger.auth({ event: 'TOKEN_REFRESH', username: user.username })
    return { ok: true, accessToken: newAccessToken }
  },
}
