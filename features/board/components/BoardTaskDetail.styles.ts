import { cva } from 'class-variance-authority'
import type { TaskStatus } from '@/db/type'

export const boardTaskDetailStyles = {
  // 전체 래퍼
  wrapper: cva('flex flex-col gap-5')(),

  // 상태 행
  statusRow: cva('flex items-center gap-2')(),

  // 섹션 라벨
  sectionLabel: cva('text-xs font-medium uppercase tracking-wide text-secondary-500 mb-0.5')(),

  // 섹션 래퍼
  section: cva('flex flex-col')(),
}

// 상태 배지 (status별 색상)
export const taskStatusBadge = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      status: {
        todo: 'bg-secondary-700 text-secondary-300',
        in_progress: 'bg-warning-950 text-warning-400',
        done: 'bg-success-950 text-success-400',
      },
    },
    defaultVariants: { status: 'todo' },
  },
)

// 상태 레이블 매핑
export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: '할 일',
  in_progress: '진행 중',
  done: '완료',
}
