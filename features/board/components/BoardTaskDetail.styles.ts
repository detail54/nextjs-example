import { cva } from 'class-variance-authority'
import type { TaskStatus } from '@/server/db/type'

export const boardTaskDetailStyles = {
  // 전체 래퍼
  wrapper: cva('flex flex-col gap-5')(),

  // 섹션 래퍼 (라벨 + 입력/표시 요소)
  section: cva('flex flex-col gap-1.5')(),

  // 섹션 라벨
  sectionLabel: cva('text-xs font-medium uppercase tracking-wide text-secondary-500')(),
}

// 상태 레이블 매핑 (SelectBox 옵션 생성에 사용)
export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: '할 일',
  in_progress: '진행 중',
  done: '완료',
}
