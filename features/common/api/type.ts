import type { TaskStatus, EpicStatus } from '@/server/db/type'

// ── 태스크 ──────────────────────────────────────────

// 태스크 데이터 타입
export type BoardTask = {
  id: number
  epicId: number
  title: string
  description: string | null
  status: TaskStatus
  priority: number
  startDate: string | null
  dueDate: string | null
  color: string | null
}

// 태스크 생성 요청 타입
export type CreateTaskRequest = {
  title: string
  startDate?: string | null
  dueDate?: string | null
}

// 태스크 수정 요청 타입
export type UpdateTaskRequest = {
  title: string
  description?: string
  status?: TaskStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}

// 태스크 이동 파라미터 타입 (status + priority 업데이트)
export type TaskMoveParams = {
  id: number
  status: TaskStatus
  priority: number
}

// 칸반 컬럼별 태스크 분류 타입
export type KanbanColumns = Record<TaskStatus, BoardTask[]>

// ── 에픽 ──────────────────────────────────────────

// 에픽 + 태스크 목록 응답 타입
export type EpicWithTasks = {
  id: number
  title: string
  description: string | null
  status: EpicStatus
  startDate: string | null
  dueDate: string | null
  color: string | null
  tasks: BoardTask[]
}

// 에픽 생성 요청 타입
export type CreateEpicRequest = {
  title: string
  description?: string
  status?: EpicStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}

// 에픽 수정 요청 타입
export type UpdateEpicRequest = {
  id: number
  title: string
  description?: string
  status?: EpicStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}
