import type { UserRole } from '@/server/core/db/type'

/** 사용자 목록 조회 정렬 기준 컬럼 */
export type UserSortBy = 'username' | 'createdAt'

/** 정렬 방향 */
export type UserSortOrder = 'asc' | 'desc'

/** 사용자 목록 조회 파라미터 */
export type GetUsersParams = {
  page: number
  pageSize: number
  sortBy?: UserSortBy
  sortOrder?: UserSortOrder
}

/** 사용자 목록 조회 결과 */
export type GetUsersResult = {
  data: UserListItem[]
  total: number
  totalPages: number
}

/** 사용자 목록 아이템 */
export type UserListItem = {
  id: number
  username: string
  email: string
  role: UserRole
  createdAt: string
}

/** 역할 변경 파라미터 */
export type UpdateUserRoleParams = {
  id: number
  role: UserRole
}

/** 담당자 선택용 간략 사용자 타입 */
export type SimpleUser = {
  id: number
  username: string
}
