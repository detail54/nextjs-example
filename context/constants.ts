// 태스크 상태 상수
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const

// 에픽 상태 상수
export const EPIC_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  COMPLETED: 'completed',
} as const

// 유저 역할 상수
export const USER_ROLE = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const
