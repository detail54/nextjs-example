import { useQuery } from '@tanstack/react-query'
import { getUserList } from '../api/userApi'
import { userManageKeys } from '../api/queryKeys'
import type { UserSortBy, UserSortOrder } from '../api/type'

// 기본 페이지당 사용자 수
export const DEFAULT_USER_PAGE_SIZE = 10

// 사용자 목록 조회 쿼리 훅
export function useUserQuery(
  page: number,
  pageSize: number = DEFAULT_USER_PAGE_SIZE,
  sortBy: UserSortBy = 'createdAt',
  sortOrder: UserSortOrder = 'desc',
) {
  return useQuery({
    queryKey: userManageKeys.list(page, pageSize, sortBy, sortOrder),
    queryFn: () => getUserList({ page, pageSize, sortBy, sortOrder }),
  })
}
