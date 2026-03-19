import { useQuery } from '@tanstack/react-query'
import { getEpicList } from '@/features/common/api/epicApi'
import { epicKeys } from '@/features/common/api/queryKeys'

// 보드 전체 조회 쿼리 훅
export function useBoardQuery() {
  return useQuery({
    queryKey: epicKeys.list(),
    queryFn: getEpicList,
  })
}
