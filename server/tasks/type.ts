import { type TaskStatus } from '@/server/core/db/type'

// ─── Task Repository 파라미터 타입 ───────────────────────────────

export type CreateTaskParams = {
  epicId: number
  title: string
  description?: string
}

export type UpdateTaskParams = {
  id: number
  title: string
  description?: string
  status?: TaskStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}

export type UpdateTaskStatusParams = {
  id: number
  status: TaskStatus
}

export type MoveToEpicParams = {
  taskId: number
  epicId: number
}

export type UpdateTaskMoveParams = {
  id: number
  status: TaskStatus
  priority: number
}
