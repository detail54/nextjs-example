import { userRepository } from './user.repository'
import type { GetUsersParams, GetUsersResult, UpdateUserRoleParams } from './type'
import { USER_MSG } from './userMsg'

export const userService = {
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
}
