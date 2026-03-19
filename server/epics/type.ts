import { type EpicStatus } from '@/server/core/db/type'

// ─── Epic Repository 파라미터 타입 ───────────────────────────────

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
