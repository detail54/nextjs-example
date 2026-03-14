// DB row types
export type UserRole = 'USER' | 'ADMIN'

export type DbUser = {
  id: number
  username: string
  password: string
  role: UserRole
  created_at: string
}

export type EpicStatus = 'active' | 'inactive' | 'completed'

export type DbEpic = {
  id: number
  title: string
  description: string | null
  status: EpicStatus
  created_at: string
  updated_at: string
}

export type TaskStatus = 'todo' | 'in_progress' | 'done'

export type DbTask = {
  id: number
  epic_id: number
  title: string
  description: string | null
  status: TaskStatus
  priority: number
  due_date: string | null
  created_at: string
  updated_at: string
}
