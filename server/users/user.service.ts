import bcrypt from 'bcryptjs'
import { userRepository } from './user.repository'
import { authRepository } from '@/server/auth/auth.repository'
import type {
  GetUsersParams,
  GetUsersResult,
  UpdateUserRoleParams,
  SimpleUser,
  UserProfile,
  UpdateMyEmailParams,
  UpdateMyPasswordParams,
} from './type'
import { USER_MSG } from './userMsg'
import type { ServiceResult, ServiceDataResult } from '@/server/core/type'

export const userService = {
  /** 내 프로필 조회 */
  getProfile(userId: number): ServiceDataResult<{ profile: UserProfile }> {
    const profile = userRepository.findProfile(userId)
    if (!profile) return { ok: false, message: USER_MSG.NOT_FOUND, status: 404 }
    return { ok: true, profile }
  },

  /** 이메일 변경: 현재 비밀번호 검증 → 이메일 중복 확인 → 업데이트 */
  async updateEmail({
    userId,
    username,
    email,
    currentPassword,
  }: UpdateMyEmailParams): Promise<ServiceResult> {
    // 현재 비밀번호 검증
    const user = authRepository.findByUsername(username)
    if (!user) return { ok: false, message: USER_MSG.NOT_FOUND, status: 404 }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) return { ok: false, message: USER_MSG.INVALID_CURRENT_PASSWORD, status: 400 }

    // 이메일 중복 확인 (자신 제외)
    const existing = userRepository.findByEmailExcludeSelf(email, userId)
    if (existing) return { ok: false, message: USER_MSG.EMAIL_TAKEN, status: 409 }

    userRepository.updateEmail(userId, email)
    return { ok: true }
  },

  /** 비밀번호 변경: 현재 비밀번호 검증 → 새 비밀번호 해싱 → 업데이트 */
  async updatePassword({
    userId,
    username,
    currentPassword,
    newPassword,
  }: UpdateMyPasswordParams): Promise<ServiceResult> {
    // 현재 비밀번호 검증
    const user = authRepository.findByUsername(username)
    if (!user) return { ok: false, message: USER_MSG.NOT_FOUND, status: 404 }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) return { ok: false, message: USER_MSG.INVALID_CURRENT_PASSWORD, status: 400 }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    userRepository.updatePassword(userId, hashedPassword)
    return { ok: true }
  },

  /** 사용자 목록 페이지 조회 */
  getList({ page, pageSize, sortBy, sortOrder }: GetUsersParams): GetUsersResult {
    const total = userRepository.countAll()
    const totalPages = Math.ceil(total / pageSize)
    const data = userRepository.getList(page, pageSize, sortBy, sortOrder)
    return { data, total, totalPages }
  },

  /** 사용자 역할 변경 */
  updateRole({ id, role }: UpdateUserRoleParams): void {
    const user = userRepository.findById(id)
    if (!user) throw new Error(USER_MSG.NOT_FOUND)
    userRepository.updateRole(id, role)
  },

  /** 전체 사용자 목록 조회 (담당자 선택용) */
  getAll(): SimpleUser[] {
    return userRepository.getAll()
  },
}
