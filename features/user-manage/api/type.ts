import type { UserRole } from '@/server/core/db/type'

/** 사용자 목록 아이템 */
export type UserItem = {
  id: number
  username: string
  email: string
  role: UserRole
  createdAt: string
}

/** 정렬 기준 컬럼 */
export type UserSortBy = 'username' | 'createdAt'

/** 정렬 방향 */
export type UserSortOrder = 'asc' | 'desc'

/** 사용자 목록 조회 요청 파라미터 */
export type UserListParams = {
  page: number
  pageSize: number
  sortBy?: UserSortBy
  sortOrder?: UserSortOrder
}

/** 역할 변경 요청 바디 */
export type UpdateUserRoleRequest = {
  role: UserRole
}
