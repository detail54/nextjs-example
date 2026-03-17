import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask, type UpdateTaskRequest } from '../api/boardTaskApi'
import { boardKeys } from '../api/queryKeys'

type UpdateTaskVariables = UpdateTaskRequest & { id: number }

// 태스크 내용 수정 뮤테이션
export function useTaskUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, title, description }: UpdateTaskVariables) =>
      updateTask(id, { title, description }),
    onSuccess: () => {
      // 보드 쿼리 초기화 (칸반 카드 제목 등 반영)
      queryClient.invalidateQueries({ queryKey: boardKeys.list() })
    },
  })
}
