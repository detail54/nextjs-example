import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEpic } from '../api/boardEpicApi'
import { boardKeys } from '../api/queryKeys'

// 에픽 삭제 뮤테이션
export function useEpicDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteEpic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.list() })
    },
  })
}
