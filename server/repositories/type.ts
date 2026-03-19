import { type UserRole, type EpicStatus, type TaskStatus } from '@/server/db/type'


// ─── Epic ─────────────────────────────────────────────────────────

export type CreateEpicParams = {
  title: string
  description?: string
  status?: EpicStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}

export type UpdateEpicParams = {
  id: number
  title: string
  description?: string
  status?: EpicStatus
  startDate?: string | null
  dueDate?: string | null
  color?: string | null
}

// ─── Task ─────────────────────────────────────────────────────────

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

// ─── Auth ─────────────────────────────────────────────────────────

export type CreateUserParams = {
  username: string
  password: string
}

export type UpdateUsernameParams = {
  userId: number
  username: string
}

export type UpdatePasswordParams = {
  userId: number
  password: string
}

export type UpdateRoleParams = {
  userId: number
  role: UserRole
}
