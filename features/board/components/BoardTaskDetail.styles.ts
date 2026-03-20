import { cva } from 'class-variance-authority'
import type { TaskStatus } from '@/server/core/db/type'

export const boardTaskDetailStyles = {
  // 전체 래퍼
  wrapper: cva('flex flex-col gap-5')(),

  // 섹션 래퍼 (라벨 + 입력/표시 요소)
  section: cva('flex flex-col gap-1.5')(),

  // 섹션 라벨
  sectionLabel: cva('text-xs font-medium uppercase tracking-wide text-secondary-500')(),

  // 삭제 버튼 영역 (하단 구분선 위)
  deleteSection: cva('pt-4 mt-auto border-t border-secondary-700/50')(),

  // 삭제 버튼
  deleteButton: cva(
    'flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors',
  )(),
}

// 상태 레이블 매핑 (SelectBox 옵션 생성에 사용)
export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: '할 일',
  in_progress: '진행 중',
  done: '완료',
}
