import { useQuery } from '@tanstack/react-query'
import { getBoardList } from '../api/boardApi'
import { boardKeys } from '../api/queryKeys'

// 보드 전체 조회 쿼리 훅
export function useBoardQuery() {
  return useQuery({
    queryKey: boardKeys.list(),
    queryFn: getBoardList,
  })
}
