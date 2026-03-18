import type { TaskStatus, EpicStatus } from '@/db/type'

// Epic repository params
export type CreateEpicParams = {
  title: string
  description?: string
}

export type UpdateEpicParams = {
  id: number
  title: string
  description?: string
}

// Task repository params
export type CreateTaskParams = {
  epicId: number
  title: string
  description?: string
}

export type UpdateTaskParams = {
  id: number
  title: string
  description?: string
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

export type BoardTask = {
  id: number
  epicId: number
  title: string
  description: string | null
  status: TaskStatus
  priority: number
  dueDate: string | null
}

export type EpicWithTasks = {
  id: number
  title: string
  description: string | null
  status: EpicStatus
  dueDate: string | null
  tasks: BoardTask[]
}

export type TaskMoveParams = {
  id: number
  status: TaskStatus
  priority: number
}

// 컬럼별 task 분류
export type KanbanColumns = Record<TaskStatus, BoardTask[]>
