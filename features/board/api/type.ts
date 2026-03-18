import type { TaskStatus, EpicStatus } from '@/server/db/type'

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
