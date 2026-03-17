import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask, type CreateTaskRequest } from '../api/boardTaskApi'
import { boardKeys } from '../api/queryKeys'

// 태스크 생성 뮤테이션
export function useTaskCreate(epicId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateTaskRequest) => createTask(epicId, params),
    onSuccess: () => {
      // 보드 전체 초기화 (새 태스크 반영)
      queryClient.invalidateQueries({ queryKey: boardKeys.list() })
    },
  })
}
