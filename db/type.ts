import type { users, epics, tasks, notices } from './schema'

// ─── Response 제너릭 타입 ─────────────────────────────────────────

/** 단일 데이터 응답 */
export type BasicResponse<T> = {
  success: boolean
  data: T
  message?: string
}

/** 배열 데이터 응답 (페이지네이션 없음) */
export type ListResponse<T> = {
  success: boolean
  data: T[]
  message?: string
}

/** 페이지네이션 포함 배열 응답 */
export type PageResponse<T> = {
  success: boolean
  data: T[]
  pagination: {
    page: number       // 현재 페이지 (1-based)
    pageSize: number   // 페이지당 항목 수
    total: number      // 전체 항목 수
    totalPages: number // 전체 페이지 수
  }
  message?: string
}

// ─── DB row types (Drizzle 스키마에서 자동 추론) ──────────────────

export type UserRole = 'USER' | 'ADMIN'
export type EpicStatus = 'active' | 'inactive' | 'completed'
export type TaskStatus = 'todo' | 'in_progress' | 'done'

/** users 테이블 row 타입 */
export type DbUser = typeof users.$inferSelect

/** epics 테이블 row 타입 */
export type DbEpic = typeof epics.$inferSelect

/** tasks 테이블 row 타입 */
export type DbTask = typeof tasks.$inferSelect

/** notices 테이블 row 타입 */
export type DbNotice = typeof notices.$inferSelect
