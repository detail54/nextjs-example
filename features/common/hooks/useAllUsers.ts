import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '@/features/common/api/userApi'
import { userKeys } from '@/features/common/api/queryKeys'

// 전체 사용자 목록 조회 훅 (담당자 선택용)
export function useAllUsers() {
  return useQuery({
    queryKey: userKeys.allUsers(),
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  })
}
