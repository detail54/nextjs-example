import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask, updateTask, deleteTask, moveTask, updateTaskAssignees } from '@/features/common/api/taskApi'
import { epicKeys } from '@/features/common/api/queryKeys'
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskMoveParams,
} from '@/features/common/api/type'

type UpdateTaskVariables = UpdateTaskRequest & { id: number }

// 태스크 생성 뮤테이션
export function useTaskCreate(epicId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateTaskRequest) => createTask(epicId, params),
    onSuccess: () => {
      // 보드 전체 초기화 (새 태스크 반영)
      queryClient.invalidateQueries({ queryKey: epicKeys.list() })
    },
  })
}

// 태스크 내용 수정 뮤테이션
export function useTaskUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, title, description, status, startDate, dueDate, color }: UpdateTaskVariables) =>
      updateTask(id, { title, description, status, startDate, dueDate, color }),
    onSuccess: () => {
      // 보드 쿼리 초기화 (칸반 카드 제목 등 반영)
      queryClient.invalidateQueries({ queryKey: epicKeys.list() })
    },
  })
}

// 태스크 삭제 뮤테이션
export function useTaskDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      // 보드 전체 초기화 (삭제된 태스크 반영)
      queryClient.invalidateQueries({ queryKey: epicKeys.list() })
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
      queryClient.invalidateQueries({ queryKey: epicKeys.list() })
    },
  })
}

// 태스크 담당자 수정 뮤테이션
export function useTaskAssigneesUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, userIds }: { taskId: number; userIds: number[] }) =>
      updateTaskAssignees(taskId, { userIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: epicKeys.list() })
    },
  })
}
