import { type TaskStatus } from '@/db/type'

// Epic
export type CreateEpicParams = {
  title: string
  description?: string
}

export type UpdateEpicParams = {
  id: number
  title: string
  description?: string
}

// Task
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
