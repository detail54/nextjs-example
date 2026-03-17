import { useMutation, useQueryClient } from '@tanstack/react-query'
import { moveTask } from '../api/boardApi'
import { boardKeys } from '../api/queryKeys'
import type { TaskMoveParams } from '../api/type'

// task 이동 뮤테이션 훅
export function useTaskMove() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: TaskMoveParams) => moveTask(params),
    onSuccess: () => {
      // 보드 데이터 재조회
      queryClient.invalidateQueries({ queryKey: boardKeys.list() })
    },
  })
}
