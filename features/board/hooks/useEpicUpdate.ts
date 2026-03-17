import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEpic, type UpdateEpicRequest } from '../api/boardEpicApi'
import { boardKeys } from '../api/queryKeys'

// 에픽 수정 뮤테이션
export function useEpicUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: UpdateEpicRequest) => updateEpic(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.list() })
    },
  })
}
