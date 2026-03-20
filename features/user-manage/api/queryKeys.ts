import type { UserSortBy, UserSortOrder } from './type'

// 사용자 관리 쿼리 키 팩토리
export const userManageKeys = {
  all: ['users'] as const,
  list: (page: number, pageSize: number, sortBy: UserSortBy, sortOrder: UserSortOrder) =>
    [...userManageKeys.all, 'list', page, pageSize, sortBy, sortOrder] as const,
}
