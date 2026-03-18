import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEpic, updateEpic, deleteEpic } from '../api/boardEpicApi'
import { boardKeys } from '../api/queryKeys'
import type { CreateEpicRequest, UpdateEpicRequest } from '../api/boardEpicApi'

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
