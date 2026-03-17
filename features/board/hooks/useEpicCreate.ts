import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEpic, type CreateEpicRequest } from '../api/boardEpicApi'
import { boardKeys } from '../api/queryKeys'

// 에픽 생성 뮤테이션
export function useEpicCreate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateEpicRequest) => createEpic(params),
    onSuccess: () => {
      // 보드 목록 전체 초기화 (새 에픽 반영)
      queryClient.invalidateQueries({ queryKey: boardKeys.list() })
    },
  })
}
