import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask, updateTask } from '../api/boardTaskApi'
import { moveTask } from '../api/boardApi'
import { boardKeys } from '../api/queryKeys'
import type { CreateTaskRequest, UpdateTaskRequest } from '../api/boardTaskApi'
import type { TaskMoveParams } from '../api/type'

type UpdateTaskVariables = UpdateTaskRequest & { id: number }

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

// 태스크 내용 수정 뮤테이션
export function useTaskUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, title, description, status, dueDate }: UpdateTaskVariables) =>
      updateTask(id, { title, description, status, dueDate }),
    onSuccess: () => {
      // 보드 쿼리 초기화 (칸반 카드 제목 등 반영)
      queryClient.invalidateQueries({ queryKey: boardKeys.list() })
    },
  })
}

// 태스크 이동 뮤테이션 (status + priority 업데이트)
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
